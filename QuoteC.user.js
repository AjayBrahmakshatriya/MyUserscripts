// ==UserScript==
// @name         QuoteC
// @namespace
// @version      0.1
// @description  A script to quote any section of C standard on Stack Overflow
// @author       @AjayBrahmakshatriya
// @match        http://port70.net/~nsz/c/c11/n1570.html*
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// @grant        GM_setClipboard
// ==/UserScript==


(function() {
    $ = jQuery;
    $("head").append($( '<style>'
                       +'.quote_link {'
                       +'    font-size: 10px;'
                       +'    padding-left:4px;'
                       +'    cursor: pointer;'
                       +'}'
                       +'</style>'));
    function quote_object(element, link) {
        var parent = $(element).parent();
        index = parent.contents().index($(element));
        parent.find(".quote_link").text("");
        text_to_show = parent.contents().filter(function(x, elem){
            return parent.contents().index($(elem)) > index;
        }).text();
        parent.find(".quote_link").text("Quote");
        chapter = link.split("#")[1];
        final_text = "Quoting `C11`, chapter [ÎåÎá" + chapter +"]("+link+" )\n> " + $.trim(text_to_show);
        GM_setClipboard(final_text.replace(/''/g, '"'));
    }

    $("p").find("a").each(function(index, value) {
        new_elem = $('<span class="quote_link">Quote</span>');
        $(value).after(new_elem);
        new_elem.click(function(link){return function(){quote_object(this, link);};}(value.href));
    });
})();


