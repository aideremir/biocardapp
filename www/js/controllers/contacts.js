/**
 * Created by administrator on 27.04.15.
 */
module.controller('contactsController', function ($scope, $http) {

    ons.ready(function () {

        var message = '';

        $scope.send = function()
        {
            $http.post('http://biocard.com/api/feedback', {email: $scope.email, phone: $scope.phone, message: $scope.message}).
                success(function (data, status, headers, config) {

                    message = 'Message sent! Thank you!';
                    ons.notification.alert({
                        messageHTML: message,
                        title: 'Message',
                        buttonLabel: 'OK',
                        animation: 'default'
                    });

                }).
                error(function(data){
                    message = 'Error sending message!';
                    ons.notification.alert({
                        messageHTML: message,
                        title: 'Message',
                        buttonLabel: 'OK',
                        animation: 'default'
                    });
                });
        }



    });
});