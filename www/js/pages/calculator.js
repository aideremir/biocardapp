module.controller('calculatorController', function ($scope, $http) {

    ons.ready(function () {
        // Init code here

        $scope.citiesFrom = [];
        $scope.citiesTo = [];


        var xml = '<?xml version="1.0" encoding="UTF-8" ?>\
        <services>\
        <auth extra="' + biocard.extra + '" login="' + biocard.login + '" pass="' + biocard.password + '"/>\
        </services>';

        modal.show();

        $http.post(biocard.apiLink, xml).
            success(function (data, status, headers, config) {

                var $services = $(data).find('service'), services = [];

                $services.each(function () {
                    var service = {
                        code: $(this).find('code').text(),
                        name: $(this).find('name').text()
                    }

                    services.push(service);
                })

                // console.log(services);

                $scope.services = services;

                modal.hide();
            })
            .error(function (data, status, headers, config) {
                modal.hide();
            })


        $scope.changeCity = function (city, list) {
            if (city.length < 4) {
                $scope[list] = [];
                return false;
            }

            var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
                '<townlist>' +
                '<conditions>' +
                '<namestarts>' + city + '</namestarts>' +
                '</conditions>' +


                '<limit>' +
                '<limitfrom>0</limitfrom>' +
                '<limitcount>10</limitcount>' +

                '</limit>' +


                '</townlist>';

            modal.show();

            $http.post(biocard.apiLink, xml).
                success(function (data, status, headers, config) {
                    //console.log(data);

                    var towns = [], $towns = $(data).find('town');

                    $towns.each(function () {
                        $town = $(this);
                        var town = {
                            code: $town.find('code').text(),
                            name: $town.children('name').text()
                        };

                        towns.push(town);
                    })


                    $scope[list] = towns;

                    modal.hide();
                }).
                error(function (data, status, headers, config) {
                    modal.hide();
                });

        }


        $scope.selectCity = function(townName, varName, list)
        {
            $scope[list] = [];
            $scope[varName] = townName;
        }

        $scope.calculate = function () {
            var xml = '<?xml version="1.0" encoding="UTF-8" ?>\
                        <calculator>\
                        <auth extra="' + biocard.extra + '" login="' + biocard.login + '" pass="' + biocard.password + '" />\
                        <calc townfrom="' + $scope.cityFrom + '" townto="' + $scope.cityTo + '" mass="' + $scope.weight + '" mode="' + $scope.deliveryType + '" />\
                    </calculator>';


            modal.show();
            $http.post(biocard.apiLink, xml).
                success(function (data, status, headers, config) {
                    console.log(data);

                    var error = $(data).text(), price = $(data).find('calc').attr('price'),
                        message = (error.trim().length > 0) ? error : 'Delivery from <b>' + $scope.cityFrom +  '</b> to <b>' + $scope.cityTo + '</b> costs <b>' + price + '&nbsp;₽</b>';


                            ons.notification.alert({
                        //message: 'Error loading data',
                        messageHTML: message,
                        title: 'Calculator result',
                        buttonLabel: 'OK',
                        animation: 'default', // or 'none'
                        // modifier: 'optional-modifier'
                        callback: function() {
                            // Alert button is closed!
                        }
                    });

                    modal.hide();
                }).
                error(function (data, status, headers, config) {

                    ons.notification.alert({
                        message: 'Error loading data',
                        // or messageHTML: '<div>Message in HTML</div>',
                        title: 'Error',
                        buttonLabel: 'OK',
                        animation: 'default', // or 'none'
                        // modifier: 'optional-modifier'
                        callback: function() {
                            // Alert button is closed!
                        }
                    });

                    modal.hide();
                });


        }


    });
});
