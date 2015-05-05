module.controller('calculatorController', function($scope, $http) {

    $scope.citiesFrom = [];
    $scope.citiesTo = [];

    $scope.changeCity = function(city, list)
    {
        if(city.length < 4) {
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

                $towns.each(function(){
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


    $scope.calculate = function()
    {
        var xml = '<?xml version="1.0" encoding="UTF-8" ?>\
                        <calculator>\
                        <auth extra="' + biocard.extra + '" login="' + biocard.login + '" pass="' + biocard.password + '" />\
                        <calc townfrom="' + $scope.cityFrom + '" townto="' + $scope.cityTo + '" mass="' + $scope.weight + '" mode="2" />\
                    </calculator>';

        console.log(xml);
    }


    ons.ready(function() {
        // Init code here
    });
});
