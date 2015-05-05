module.controller('newsController', ['$scope', '$sce', function($scope, $sce) {
    ons.ready(function() {

        $scope.failed = false;
        $scope.isFetching = true;
        modal.show();

        $.get('http://biocard.com/api/news',function (data) {

            var $feed = $(data), content = '', newsList = [];

            $feed.find('channel item').each(function () {
                var $item = $(this);

                //console.log($item);

                var newsListItem = {
                    title: $sce.trustAsHtml($item.find('title').text()),
                    //date: $sce.trustAsHtml(biocard.utils.dateFormat($item.find('pubDate').html())),
                    date: $sce.trustAsHtml($item.find('pubDate').text()),
                    desc: $sce.trustAsHtml($item.find('description').text())
                }

                newsList.push(newsListItem);

            })

            $scope.$apply(function(){
                $scope.newsList = newsList;
                $scope.test = $sce.trustAsHtml('<b>test!</b>');
                $scope.isFetching = false;
                $scope.failed = false;
            })

            modal.hide();

        }).fail(function () {
            $scope.$apply(function(){
                $scope.failed = true;
                $scope.isFetching = false;
            });

            modal.hide();

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

        });
    });
}]);