/**
 * Created by administrator on 27.04.15.
 */
module.controller('loginController', function ($scope, $http) {

    ons.ready(function () {

        $scope.loginPage = {
            onLine: navigator.onLine,

            auth: function () {
                return false;
            },
            userLogin: function () {
                var login = this.login, password = this.password;

                modal.show();

                var xml = '<itemlist>' +
                    '<auth extra="' + biocard.extra + '" login="' + login + '" pass="' + password + '" />' +
                    '</itemlist>';


                $http.post(biocard.apiLink, xml).
                    success(function (data, status, headers, config) {

                        var $error = $(data).find('error');

                        if ($error.length > 0) {

                            ons.notification.alert({
                                message: 'Wrong login or password',
                                title: 'Error',
                                buttonLabel: 'OK',
                                animation: 'default'
                            });
                        }
                        else {

                            localStorage.setItem('login', login);
                            localStorage.setItem('password', password);

                            biocard.login = login;
                            biocard.password = password;

                            menu.setMainPage('pages/tracking.html', {closeMenu: true});

                        }

                        modal.hide();
                    }).
                    error(function (data, status, headers, config) {

                        console.log(data);
                        console.log(status);
                        console.log(headers);
                        console.log(config);


                        /*
                        ons.notification.alert({
                            message: data,
                            title: status,
                            buttonLabel: 'OK',
                            animation: 'default'
                        });
                        */


                        modal.hide();
                    });

                return true;
            }
        }

    });
});

