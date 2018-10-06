(function () {
    var cookieExpireDays = 60;
    var cookieName = 'cookie_disclaimer';
    var disclaimerBoxId = 'cookie_disclaimer';
    var defaultLanguage = 'de';

    var languages = {
        'de': {
            'text': 'Diese Webseite verwendet Cookies. Wenn Sie diese Webseite nutzen, akzeptieren Sie die Verwendung von Cookies. {{link}}.',
            'link': '#',
            'link_text': 'Mehr erfahren',
            'button_text': 'OK'
        }
    };

    function setDisclaimerCookie() {
        var d = new Date();
        d.setTime(d.getTime() + (cookieExpireDays * 24 * 60 * 60 * 1000));
        var expires = 'expires=' + d.toUTCString();
        document.cookie = cookieName + '=' + 1 + ';' + expires + ';;path=/';
    }

    function isDisclaimerCookieSet() {
        return document.cookie.indexOf(cookieName + '=') >= 0;
    }

    function removeDisclaimer() {
        setDisclaimerCookie();

        var elem = document.getElementById(disclaimerBoxId);
        elem.parentNode.removeChild(elem);
    }

    function buildDisclaimerBox() {
        var text = languages[defaultLanguage];

        var link = '<a href="'+text.link+'" style="text-decoration: underline;color:#ffffff;">'+text.link_text+'</a>';
        text.text = text.text.replace('{{link}}', link);

        var outerDiv = document.createElement('div');
        outerDiv.style.position = 'fixed';
        outerDiv.style.left = '0';
        outerDiv.style.right = '0';
        outerDiv.style.bottom = '0';
        outerDiv.style.width = '100%';
        outerDiv.style.background = 'rgba(0,0,0,0.8)';
        outerDiv.style.color = '#cccccc';
        outerDiv.style.padding = '15px';
        outerDiv.style.zIndex = '36000';
        outerDiv.style.boxSizing = 'border-box';

        outerDiv.id = disclaimerBoxId;

        var table = document.createElement('table');
        table.attributes.border = '0';
        table.attributes.cellspacing = '0';
        table.attributes.cellpadding = '0';

        outerDiv.appendChild(table);

        var tr = document.createElement('tr');

        table.appendChild(tr);

        var td = document.createElement('td');
        td.innerHTML = text.text;
        tr.appendChild(td);

        td = document.createElement('td');
        td.style.width = '10px';
        td.innerHTML = '&nbsp;';
        tr.appendChild(td);

        td = document.createElement('td');
        tr.appendChild(td);

        var span = document.createElement('span');
        span.style.cursor = 'pointer';
        span.className = 'btn-custom';

        span.innerHTML = text.button_text;

        span.addEventListener('click', removeDisclaimer);

        td.appendChild(span);

        document.body.appendChild(outerDiv);
    }

    if (!isDisclaimerCookieSet()) {
        buildDisclaimerBox();
    }
})();