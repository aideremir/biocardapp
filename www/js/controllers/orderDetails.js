/**
 * Created by administrator on 27.04.15.
 */
/**
 * Created by administrator on 27.04.15.
 */
module.controller('orderDetailsController', function ($scope) {

    ons.ready(function () {

        var page = nav.getCurrentPage(), order = (page.options.order); //

        $scope.order = order;

        $scope.tabs = {
            sender: false,
            receiver: false,
            details: true
        }

        $scope.show = function(tab)
        {
            $scope.tabs = {
                sender: false,
                receiver: false,
                details: false
            }

            $scope.tabs[tab] = true;
        }

    });
});