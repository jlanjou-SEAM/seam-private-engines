/**
 * Cookie Notice JS
 */
;
(function () {

    "use strict";

    /**
     * Store current instance
     */
    var instance;

    /**
     * Defaults values
     * @type object
     */
    var defaults = {
        'messageLocales': {
            'ar': 'نستخدم في هذا الموقع الإلكتروني ملفات تعريف الارتباط "الكوكيز" لنمنحك أفضل تجربة مستخدم ممكنة. تعرف على المزيد حول كيفية استخدامها ‎...',
            'en': 'This website use cookies files to personalise web content, analyse visits and store your preferences ..'
        },

        'cookieNoticePosition': 'bottom',

        'learnMoreLinkEnabled': true,

        'learnMoreLinkHref': '/pages/privacy-policy',

        'learnMoreLinkText': {
            'ar': 'المزيد',
            'en': 'More'
        },

        'buttonLocales': {
            'en': 'I Agree',
            'ar': 'أوافق'
        },

        'expiresIn': 365,
        'buttonBgColor': '#324b7f',
        'buttonTextColor': '#fff',
        'noticeBgColor': 'rgba(0,0,0,0.8)',
        'noticeTextColor': '#fff',
        'linkColor': '#009fdd'
    };

    /**
     * Initialize cookie notice on DOMContentLoaded
     * if not already initialized with alt params
     */
    document.addEventListener('DOMContentLoaded', function () {
        if (!instance) {
            new cookieNoticeJS();
        }
    });

    /**
     * Constructor
     * @constructor
     */
    window.cookieNoticeJS = function () {

        // If an instance is already set stop here
        if (instance !== undefined) {
            return;
        }

        // Set current instance
        instance = this;

        // If cookies are not supported or notice cookie is already set
        if (getNoticeCookie()) {
            return;
        }

        // Extend default params
        var params = extendDefaults(defaults, arguments[0] || {});

        // Get current locale for notice text
        var noticeText = getStringForCurrentLocaleWithDirection(params.messageLocales);

        // Create notice
        var notice = createNotice(noticeText, params.noticeBgColor, params.noticeTextColor, params.cookieNoticePosition);

        var learnMoreLink;

        if (params.learnMoreLinkEnabled) {
            var learnMoreLinkText = getStringForCurrentLocale(params.learnMoreLinkText);

            learnMoreLink = createLearnMoreLink(learnMoreLinkText, params.learnMoreLinkHref, params.linkColor);
        }

        // Get current locale for button text
        var buttonText = getStringForCurrentLocale(params.buttonLocales);

        // Create dismiss button
        var dismissButton = createDismissButton(buttonText, params.buttonBgColor, params.buttonTextColor);

        // Dismiss button click event
        dismissButton.addEventListener('click', function (e) {
            e.preventDefault();
            //  console.log('expir',parseInt(params.expiresIn + "", 10) * 60 * 1000 * 60 * 24);
            setDismissNoticeCookie(parseInt(params.expiresIn + "", 10) * 60 * 1000 * 60 * 24);
            fadeElementOut(notice);
        });

        // Append notice to the DOM
        var noticeDomElement = document.body.appendChild(notice);

        if (!!learnMoreLink) {
            noticeDomElement.appendChild(learnMoreLink);
        }

        noticeDomElement.appendChild(dismissButton);

    };

    /***
     * Get locale
     *
     */
    function getCurrentLocale(){
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var locale = (urlParams.get('lang') === null)? 'ar': urlParams.get('lang');
        return locale;
    }

    /**
     * Get the string for the current locale
     * and fallback to "en" if none provided
     * @param locales
     * @returns {*}
     */
    function getStringForCurrentLocaleWithDirection(locales) {
        var locale = getCurrentLocale();
        var stringAndDirection = {
            "text": (locales[locale]) ? locales[locale] : locales['en'],
            "direction": locale === 'en' ? 'ltr' : 'rtl'
        }
        return stringAndDirection;
        //return (locales[locale]) ? locales[locale] : locales['en'];
    }

    /**
     * Get the string for the current locale
     * and fallback to "en" if none provided
     * @param locales
     * @returns {*}
     */
    function getStringForCurrentLocale(locales) {
        var locale = getCurrentLocale();
        return (locales[locale]) ? locales[locale] : locales['en'];
    }

    /**
     * Test if cookies are enabled
     * @returns {boolean}
     */
    function testCookie() {
        document.cookie = 'testCookie=1';
        return document.cookie.indexOf('testCookie') != -1;
    }

    /**
     * Test if notice cookie is there
     * @returns {boolean}
     */
    function getNoticeCookie() {
        return document.cookie.indexOf('__NCMGDPR_CC') != -1;
    }

    /**
     * Create notice
     * @param message
     * @param bgColor
     * @param textColor
     * @param position
     * @returns {HTMLElement}
     */
    function createNotice(message, bgColor, textColor, position) {
        var locale = getCurrentLocale();
        var notice = document.createElement('div'),
            noticeStyle = notice.style;

        notice.innerHTML = message.text + '&nbsp;';
        notice.setAttribute('id', 'cookieNotice');

        noticeStyle.position = 'fixed';

        if (position === 'top') {
            noticeStyle.top = '0';
        } else {
            noticeStyle.bottom = '0';
        }

        noticeStyle.direction = message.direction;
        noticeStyle.left = '0';
        noticeStyle.right = '0';
        noticeStyle.background = bgColor;
        noticeStyle.color = textColor;
        noticeStyle["z-index"] = '999';
        noticeStyle.padding = '10px 5px';
        noticeStyle["text-align"] = 'center';
        noticeStyle["font-size"] = (locale === 'ar')? "12px":"0.7rem";
        noticeStyle["line-height"] = "28px";
        if(locale === 'ar')
           noticeStyle.fontFamily = "Droid Arabic Naskh", "Roboto", "Segoe", "Segoe UI", "Verdana", "sans-serif";
        return notice;
    }

    /**
     * Create dismiss button
     * @param message
     * @param buttonColor
     * @param buttonTextColor
     * @returns {HTMLElement}
     */
    function createDismissButton(message, buttonColor, buttonTextColor) {
        var locale = getCurrentLocale();
        var dismissButton = document.createElement('a'),
            dismissButtonStyle = dismissButton.style;

        // Dismiss button
        dismissButton.href = '#';
        dismissButton.innerHTML = message;

        dismissButton.className = 'confirm';

        // Dismiss button style
        dismissButtonStyle.background = buttonColor;
        dismissButtonStyle.color = buttonTextColor;
        dismissButtonStyle['text-decoration'] = 'none';
        dismissButtonStyle.display = 'inline-block';
        dismissButtonStyle.padding = '0 15px';
        dismissButtonStyle.margin = '0 10px 0 10px';
        dismissButtonStyle.borderRadius = '4px';
        dismissButtonStyle.fontSize = locale === 'en'? '11px' : '12px';

        return dismissButton;

    }

    /**
     * Create dismiss button
     * @param learnMoreLinkText
     * @param learnMoreLinkHref
     * @param linkColor
     * @returns {HTMLElement}
     */
    function createLearnMoreLink(learnMoreLinkText, learnMoreLinkHref, linkColor) {
        var locale = getCurrentLocale();
        var learnMoreLink = document.createElement('a'),
            learnMoreLinkStyle = learnMoreLink.style;

        // Dismiss button
        learnMoreLink.href = learnMoreLinkHref+'?lang='+locale;
        learnMoreLink.textContent = learnMoreLinkText;
        learnMoreLink.target = '_blank';
        learnMoreLink.className = 'learn-more';

        // Dismiss button style
        learnMoreLinkStyle.color = linkColor;
        learnMoreLinkStyle['text-decoration'] = 'none';
        learnMoreLinkStyle.display = 'inline';

        return learnMoreLink;

    }

    /**
     * Set sismiss notice cookie
     * @param expireIn
     */
    function setDismissNoticeCookie(expireIn) {
        var now = new Date(),
            cookieExpire = new Date();

        cookieExpire.setTime(now.getTime() + expireIn);
        document.cookie = "__NCMGDPR_CC=1; secure; expires=" + cookieExpire.toUTCString() + "; path=/; samesite=strict;";
    }

    /**
     * Fade a given element out
     * @param element
     */
    function fadeElementOut(element) {
        element.style.opacity = 1;
        (function fade() {
            (element.style.opacity -= .1) < 0.01 ? element.parentNode.removeChild(element) : setTimeout(fade, 40)
        })();
    }

    /**
     * Utility method to extend defaults with user options
     * @param source
     * @param properties
     * @returns {*}
     */
    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                if (typeof source[property] === 'object') {
                    source[property] = extendDefaults(source[property], properties[property]);
                } else {
                    source[property] = properties[property];
                }
            }
        }
        return source;
    }

    /* test-code */
    cookieNoticeJS.extendDefaults = extendDefaults;
    cookieNoticeJS.clearInstance = function () {
        instance = undefined;
    };
    /* end-test-code */

}());
