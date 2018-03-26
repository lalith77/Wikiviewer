$(document).ready(function () {
    $('.search').on('click', function () {
        $('.home').addClass('hidden');
        $('.results').removeClass('hidden');
        var typed = $('#homeinput').val();
        getResults(typed);
    });

    $("#inputbox").keyup(function (event) {
        if (event.keyCode === 13) {
            var typed = $('#inputbox').val();
            getResults(typed);
        }
    });

    $('.glyphicon').on('click', function () {
        var typed = $('#inputbox').val();
        getResults(typed);
    });


    function getResults(typed) {


        $.ajax({
            url: 'http://en.wikipedia.org/w/api.php',
            data: { action: 'query', list: 'search', srsearch: typed, format: 'json', prop: 'info', inprop: 'url' },
            dataType: 'jsonp',
            success: processResult
        });

        function processResult(apiResult) {
            $('.links').empty();
            //console.log("apiresult is:" + JSON.stringify(apiResult));
            for (var i = 0; i < apiResult.query.search.length; i++) {
                var keyword = apiResult.query.search[i].title.replace(/\s/g, "_");
                var link = "https://en.wikipedia.org/wiki/" + keyword;
                $('.links').append('<a href=' + link + '><h4 class="resulttitle">' + apiResult.query.search[i].title + '</h4></a>');
                $('.links').append('<h5 class="snippets">' + apiResult.query.search[i].snippet + '</h5>');
                $('.links').append('<p class="info"> ' + apiResult.query.search[i].size + 'kb (' + apiResult.query.search[i].wordcount + ' words) -' + new Date(apiResult.query.search[i].timestamp) + '  </p>')

            }

        }


    }



});