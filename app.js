$(document).ready(function () {

    // $('.glyphicon').on('click', function () {
    //     $('.glyphicon').append('<input type="text" class="space" id="field" placeholder="Enter query"/> ');

    //     $('.space').appendTo('.random');
    //     $('.glyphicon').remove();



    // });
    // $('.random').on('keypress', function (e) {
    //     if (e.keyCode == 13) {
    //         // Enter pressed... do anything here...



    //         var typed = $('#field').val();
    //         //var typed= document.getElementById("field").value;
    //         console.log(typed);
    //         $.getJSON('https://en.wikipedia.org/w/api.php?action=opensearch&search=' + typed + '&limit=8&namespace=0&origin=*&format=json', function (json) {


    //             //   $(".links").append('<h3> '+arr+'</h3>');
    //             var len = json[1].length;
    //             var i = 0;
    //             $(".links").empty();
    //             while (i < len) {

    //                 $(".links").append('<div class="blocks text-center"><a target="_blank" href=' + json[3][i] + '><h3>' + json[1][i] + '</h3> </br> <p> ' + json[2][i] + '</p> </a> </div>');
    //                 i++;
    //             }
    //         });
    //     }

    // });

    $('.search').on('click', function () {
        console.log("yoda");
        $('.home').addClass('hidden');
        $('.results').removeClass('hidden');
        var typed = $('#homeinput').val();
        console.log("typed value is:" + typed);

        $.ajax({
            url: 'http://en.wikipedia.org/w/api.php',
            data: { action: 'query', list: 'search', srsearch: typed, format: 'json', prop: 'info', inprop: 'url' },
            dataType: 'jsonp',
            success: processResult
        });

        function processResult(apiResult) {
            console.log("apiresult is:" + JSON.stringify(apiResult));
            for (var i = 0; i < apiResult.query.search.length; i++) {
                var keyword = apiResult.query.search[i].title.replace(/\s/g, "_");
                var link = "https://en.wikipedia.org/wiki/" + keyword;
                //console.log("keyword is:" + keyword);
                $('.links').append('<a href=' + link + '><h4 class="resulttitle">' + apiResult.query.search[i].title + '</h4></a>');
                $('.links').append('<h5 class="snippets">' + apiResult.query.search[i].snippet + '</h5>');
                $('.links').append('<p class="info"> ' + apiResult.query.search[i].size + 'kb (' + apiResult.query.search[i].wordcount + ' words) -' + new Date(apiResult.query.search[i].timestamp) + '  </p>')

            }

        }

    })

    //TODO: to make links, create link like wikepedia.org/title , where title's spaces are replaced with underscores


});