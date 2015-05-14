/**
 * Created by administrator on 27.04.15.
 */
module.controller('orderController', function ($scope, $http) {

    ons.ready(function () {

        $scope.tabs = {
            receiver: false,
            details: true
        }

        $scope.show = function(tab)
        {
            $scope.tabs = {
                receiver: false,
                details: false
            }

            $scope.tabs[tab] = true;
        }

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

    });

    $scope.addOrder = function()
    {
        var order = $scope.order, xml = '<?xml version="1.0" encoding="UTF-8"?>\
            <neworder>\
            <auth extra="' + biocard.extra + '" login="' + biocard.login + '" pass="' + biocard.password + '"></auth>\
            <order>\
            <receiver>\
                <company>' + order.company + '</company>\
                <person>' + order.person + '</person>\
                <phone>' + order.phone + '</phone>\
                <town>' + order.town + '</town>\
                <address>' + order.address + '</address>\
                <date>' + order.date + '</date>\
                <time_min>' + order.timeMin + '</time_min>\
                <time_max>' + order.timeMax + '</time_max>\
            </receiver>\
            <weight>' + order.weight + '</weight>\
            <quantity>' + order.quant + '</quantity>\
            <service>' + order.deliveryType + '</service>\
            <price>' + order.sum + '</price>\
            <enclosure>' + order.attach + '</enclosure>\
            <instruction>' + order.comments + '</instruction>\
        </order>\
    </neworder>';

        console.log(xml);

        modal.show();

        $http.post(biocard.apiLink, xml).
            success(function (data, status, headers, config) {

                var errormsg = $(data).find('createorder').attr('errormsg');

                if (errormsg != 'success') {

                    ons.notification.alert({
                        message: errormsg,
                        title: 'Error',
                        buttonLabel: 'OK',
                        animation: 'default'
                    });
                }
                else {



                }

                modal.hide();
            }).
            error(function (data, status, headers, config) {


                 ons.notification.alert({
                 message: data,
                 title: status,
                 buttonLabel: 'OK',
                 animation: 'default'
                 });



                modal.hide();
            });
    }
});