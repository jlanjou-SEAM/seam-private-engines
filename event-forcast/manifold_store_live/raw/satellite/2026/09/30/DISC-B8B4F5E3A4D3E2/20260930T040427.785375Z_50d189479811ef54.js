(function($) {
	var thumbsAreLoaded = false;
	var data_imagery = new Array();
	var searchTimerID = null;
	var filtered_data_imagery = new Array();

	$(document).ready(function() {
		init_controls();
		init_search();
		$(window).bind('resize', loadThumbs);
		loadThumbs();
		init_category_filter_mobile();
	});

	//////////////////////////////////////////////////////////
	// FUNCTIONS
	//////////////////////////////////////////////////////////
	function loadThumbs() {
		if (thumbsAreLoaded) return;

		$(".data_imagery-thumb").each(function() {
			var src = $(this).attr('data-img_src');
			$(this).attr('src', src);
		});
	}

	function init_category_filter_mobile() {

		var $menu = $(".category-filter-mobile").eq(0);

		// change the selected menu option to correspond to the URL
		var q = window.location.hash.substr(1);
		q = parse_query_string(q);
		if ( ! q.hasOwnProperty('category')) q.category = 'all';
		$menu.val(q.category);

		// ok, now make the menu work
		$menu.bind('change', function(){
			window.location.hash = 'category=' + $(this).val();
		});
	}

	function init_search() {

		var $data_imagery_search = $(".list-search").eq(0);

		// initialize search array
		var text = '';
		$("#data_imagery-list").children('li').each(function() {
			text = $(this).text();
			text = $.trim(text.replace(/\s{2,}/g, ' ')); // collapse white space
			text = text.replace(/[^a-zA-Z0-9 \-_.:;@]/, ''); // remove characters we don't want to search on
			// text = text.replace(/[\r\n]/g, ''); // remove carriage returns
			text = text.replace(/[()]/g, '');
			data_imagery.push(text);
		});

		// ok, now intialize search box value and make it editable
		$data_imagery_search.removeAttr('readonly').val('Search');
		var auto_complete_list = JSON.parse($(".list-search-autocomplete-list").eq(0).val());
		$data_imagery_search.autocomplete({
			source: auto_complete_list
		});

		$("#clear_search").bind('click', function(){
			filterDataImagery(false);
			$(".list-search").eq(0).val('');
		});

		// make enter key lose focus on search text box
		$data_imagery_search.bind('keyup',function(e) {
			if (e.keyCode == '13') {
				$data_imagery_search.blur();
			}
		});

		// make search box work - i.e., filter the data_imagery list
		$data_imagery_search.focusout(function(){
			clearInterval(searchTimerID);
			searchDataImagery();
		});

		$data_imagery_search.focusin(function(){
			window.location.hash = 'category=all';
			$(this).val('');
			$data_imagery_search.trigger('change');

			searchTimerID = setInterval(
				function(){
					// $data_imagery_search.trigger('focusout');
					searchDataImagery();
				},
				500
			);
		});
	}

	function searchDataImagery() {
		var q = $.trim($(".list-search").eq(0).val());

		if ( q == '' ) {
			filterDataImagery(false);
			return;
		}

		filtered_data_imagery = new Array();

		var regex = null;
		for (var i = 0; i < data_imagery.length; i++) {
			regex = new RegExp("\\b(" + q + ")\\b", "gi");
			if (data_imagery[i].search(regex) != -1) {
				filtered_data_imagery.push(i);
			}
		}

		filterDataImagery(filtered_data_imagery);
	}

	function filterDataImagery(projectIndices) {
		if (projectIndices === false) {
			$("#data_imagery-list").children("li").show();
			return;
		}

		$("#data_imagery-list").children("li").hide();

		for (var i = 0; i < projectIndices.length; i++) {
			$("#data_imagery-list").children("li").eq(projectIndices[i]).show();
		}
	}

	function init_controls() {
		$(window).bind('hashchange', function() {
			var q = window.location.hash.substr(1);
			q = parse_query_string(q);

			if (q.hasOwnProperty('category')) {
				show_category(q.category);
			} else if (q.hasOwnProperty('search')) {
				alert('NOT IMPLEMENTED YET'); // IMPROVE
			} else {
				show_category('all');
			}
		});
		$(window).trigger('hashchange');
	}

	function parse_query_string(q_string) {
		var q = {};
		var pairs = q_string.split('&');
		var key_value;
		for (i = 0; i < pairs.length; i++) {
			key_value = pairs[i].split('=', 2);
			q[key_value[0]] = key_value[1];
		}

		return q;
	}

	function show_category(category) {

		// highlight the category link corresponding to the current category being shown
		var cat_links = $(".category-filter").eq(0).children("li");
		$(cat_links).removeClass('current_cat_link');
		$(cat_links).filter('[data-category="' + category + '"]').addClass('current_cat_link');

		// set the mobile category menu as well
		$("#category_filter_mobile").val(category);

		if (category == 'all') {
			$("#data_imagery-list").children('li').show();
			return;
		}

		// ok, now filter the data_imagery list based on the current category
		var index = 0;
		$("#data_imagery-list").children('li').each(function() {
			if ($(this).is('[data-' + category + '="true"]')) {
				$(this).show();
			} else {
				$(this).hide();
			}
			index++;
		});
	}
})(jQuery);
	