define(['angular', 'directives'], function (angular, directives) {
    'use strict';

    return directives
        .directive('utOneToMany', function ($http, LoadingToggler, Positioner) {
            return {
                link: function ($scope, element, attrs) {
                    var clearItems, initItems, input, onScrollEvent, positionResults, resultContainer,
                        requiredVars, updateModel, initRelation, relation, checkRequiredVars, onClickInit,
                        searchInput, onClick, onKeyDown
                    ;

                    input = element.find('div#ut-one-to-many-container')
                    searchInput = element.find('input#one-to-many-search')
                    resultContainer = element.find('div.results-container')

                    checkRequiredVars = function () {
                        // confirm we have all the info we need
                        requiredVars = ['resource', 'model', 'foreignKey', 'relation', 'placeholder']
                        for (var k in requiredVars) {
                            if (!$scope[requiredVars[k]]) {
                                throw new Error('scope variable "' + requiredVars[k] + '" is required for one to many input')
                            }
                        }
                    }

                    initItems = function (search) {
                        LoadingToggler.on();
                        $http.get('/api/' + $scope.resource + '?search=' + search +'&perPage=5' + '&not=' + relation.keys.join(',')).then(function (response) {
                            $scope.items = response.data
                            LoadingToggler.off()
                            positionResults()
                        });
                    }

                    initRelation = function () {
                        if (typeof $scope.model.relations == 'undefined') {
                            $scope.model.relations = []
                        }

                        relation = {
                            foreignKey: $scope.foreignKey,
                            alias: $scope.relation
                        }

                        $scope.model.relations.push(relation)

                        $scope.selectedItems = $scope.access ? $scope.access : []

                        updateModel()
                    }

                    positionResults = function () {
                        Positioner.positionUnder(resultContainer, input)
                    }

                    clearItems = function () {
                        delete $scope.items
                    }

                    onScrollEvent = function () {
                        if (!$scope.items) {
                            return;
                        }

                        positionResults()

                        // the results container is open and we are scrolling so lets close it
                        if ($scope.items.length) {
                            delete $scope.items
                            $scope.$apply()
                        }
                    }

                    updateModel = function () {
                        relation.keys = $scope.selectedItems.map(function (item) {
                            if (!item.id) {
                                throw new Error('Item must have a primary key "id"')
                            }

                            return item.id
                        })
                    }

                    onClickInit = function () {
                        initItems('%')
                    }

                    // hide the drop down when user clicks anywhere else
                    onClick = function (e) {
                        if (!$(e.target).parents('#ut-one-to-many-container').length) {
                            delete $scope.items
                            $scope.$apply()
                        }
                    }

                    onKeyDown = function (e) {
                        if (e.keyCode == 8 && $scope.selectedItems.length && !$scope.search) {
                            $scope.selectedItems.splice($scope.selectedItems.length - 1, 1)
                            updateModel()
                            $scope.$apply()
                        }
                    }

                    $('*').bind('scroll', onScrollEvent);

                    element.on('$destroy', function () {
                        $('*').unbind('scroll', onScrollEvent)
                        searchInput.unbind('focus', onClickInit)
                        angular.element('body').off('click', onClick);
                    });

                    searchInput.bind('focus', onClickInit);

                    searchInput.bind('keydown', onKeyDown);

                    angular.element('body').on('click', onClick);

                    $scope.$watch('search', function (v) {
                        typeof v != 'undefined' && v
                            ? initItems(v)
                            : clearItems()
                    })

                    $scope.$watch('model', function (v) {
                        if (typeof v != 'undefined' && v) initRelation()
                    })

                    $scope.$watch('model.$resolved', function (v) {
                        if (typeof v != 'undefined' && v) {
                            checkRequiredVars()
                            initRelation()
                        }
                    })

                    $scope.select = function (item) {
                        $scope.selectedItems.push(item)
                        $scope.search = ''; delete $scope.items
                        searchInput.unbind('focus', onClickInit)
                        searchInput.focus()
                        searchInput.bind('focus', onClickInit)
                        updateModel()
                    }

                    $scope.remove = function (item) {
                        $scope.selectedItems.splice($scope.selectedItems.indexOf(item), 1)
                        updateModel()
                    }
                },
                restrict: 'E',
                scope: {
                    resource: '@',
                    model: '=',
                    foreignKey: '@',
                    relation: '@',
                    access: '=',
                    placeholder: '@',
                },
                templateUrl: '/app/partials/form/utOneToMany.html'
            }
        })
    ;
});