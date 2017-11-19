/**
 * Created by teddygod on 10.09.2017.
 */
// $(window).on("load",function(){
// 	$("body").mCustomScrollbar({
// 		theme:"minimal-dark"
// 	});
// 	$(".seo_text").mCustomScrollbar({
// 		theme:"dark"
// 	});
// });

$(window).on('load', function () {
	var $preloader = $('#page-preloader'),
		$spinner   = $preloader.find('.spinner');
	$spinner.fadeOut();
	$preloader.delay(350).fadeOut('slow');
});
$(document).ready(function () {



	var $ds_mf = $('#ds-mf-slider'),
		$ds_mf_attr = $('#ds-mf-slider-attributes'),
		handle_min = $("#custom-handle-min"),
		handle_max = $("#custom-handle-max"),
		$inpt_min = $("#price-from"),
		$inpt_max = $("#price-to"),
		values,
		firstval,
		secval;

	$ds_mf.slider({
		range: true,
		min: +$ds_mf_attr.attr('data-range-min'),
		max: +$ds_mf_attr.attr('data-range-max'),
		step: +$ds_mf_attr.attr('data-range-step'),
		values: [+$ds_mf_attr.attr('data-range-min-initial'), +$ds_mf_attr.attr('data-range-max-initial')],
		create: function () {
			values = $ds_mf.slider("option", "values");
			firstval = values[0];
			secval = values[1];
			handle_min.html('<span class="slider-value">' + firstval + " " + $ds_mf_attr.attr('data-range-postfix') + '</span>');
			handle_max.html('<span class="slider-value">' + secval + " " + $ds_mf_attr.attr('data-range-postfix') + '</span>');
		},
		slide: function (event, ui) {
			setTimeout(function () {
				values = $ds_mf.slider("option", "values");
				firstval = values[0];
				secval = values[1];
				handle_min.html('<span class="slider-value">' + firstval + " " + $ds_mf_attr.attr('data-range-postfix') + '</span>');
				handle_max.html('<span class="slider-value">' + secval + " " + $ds_mf_attr.attr('data-range-postfix') + '</span>');
			}, 10);
		},
		stop: function (event, ui) {
			values = $ds_mf.slider("option", "values");
			firstval = values[0];
			secval = values[1];
			handle_min.html('<span class="slider-value">' + firstval + " " + $ds_mf_attr.attr('data-range-postfix') + '</span>');
			handle_max.html('<span class="slider-value">' + secval + " " + $ds_mf_attr.attr('data-range-postfix') + '</span>');
			$inpt_min.attr("value", firstval);
			$inpt_max.attr("value", secval);
		}
	});

	/*$("body").mCustomScrollbar({
		theme:"minimal-dark"
	});*/
	$(".seo_text").mCustomScrollbar({
		theme:"dark"
	});
	(function ($, undefined) { // button-up
		var btnUp = $("#button-up");
		$(window).scroll(function () {
			var scroll = $(this).scrollTop()
				,maxScroll = $(document).height() - $(window).height()
				,heightWindow = $(window).height()
			;
			if ( scroll > maxScroll - heightWindow) {
				btnUp.addClass("button-up_active")
					.stop().animate({
						"right" : 30+"px"
					}
					,400
				);
			}
			else {
				btnUp.stop().animate({
						"right" : -200+"px"
					}
					, 400
					, function () {
						$(this).removeClass("button-up_active");
					}
				);
			}
		});
		btnUp.bind('click', function (event) {
			event.preventDefault();
			$("body, html").animate({
					"scrollTop" : 0
				}
				,500);
		});
	})($);

	(function ($, undefined) { //TODO filter-mob
		var mob_filter = $(".mob_filter");

		mob_filter.find(".mob_filter-open").on('click', openFilter);
		mob_filter.find(".mob_filter-close").on('click', closeFilter);

		function openFilter() {
			mob_filter.find(".mob_filter-content").toggle();
			mob_filter.find(".mob_filter-close").toggle();
		}

		function closeFilter() {
			mob_filter.find(".mob_filter-content").toggle();
			mob_filter.find(".mob_filter-close").toggle();
		}

	})($);

	$(".field-ordersform-pay").on("change", function () {
		var Pay = $(".field-ordersform-pay").find("#by_pay").val(),
			fio = $(".field-ordersform-FIO"),
			deliver = $(".field-ordersform-deliv").find("#by_deliv").val(),
			awey = $(".field-ordersform-tackeAway"),
			np = $(".field-ordersform-numb_NP"),
			addres = $(".field-ordersform-address");

		switch (Pay) {
			case "2":

				if ($(".field-ordersform-FIO:visible")) {
					fio.css("display", "block")
				}else {
					fio.toggle();
				}
				break;
			case "3":
				if ($(".field-ordersform-FIO:visible")) {
					fio.css("display", "block")
				}else {
					fio.toggle();
				}

				break;
			default:
				fio.css("display", "none");
				return false;
		}
	})

	$(".field-ordersform-deliv").on("change", function () {
		var Pay = $(".field-ordersform-pay").find("#by_pay").val(),
			fio = $(".field-ordersform-FIO"),
			deliver = $(".field-ordersform-deliv").find("#by_deliv").val(),
			awey = $(".field-ordersform-tackeAway"),
			np = $(".field-ordersform-numb_NP"),
			addres = $(".field-ordersform-address");

		switch (deliver) {
			case "1":
				awey.css("display", "block");
				np.css("display", "none");
				addres.css("display", "none");
				break;
			case "2":
				awey.css("display", "none");
				np.css("display", "block");
				addres.css("display", "none");
				break;
			case "3":
				awey.css("display", "none");
				np.css("display", "none");
				addres.css("display", "block");
				break;
			default:
				awey.css("display", "none");
				np.css("display", "none");
				addres.css("display", "none");
				return false;
		}
	})

	$("#example_id").on("change", function () {
		var example_id = $("#example_id").val(),
			discount_value = $(".discount_value span"),
			example_idNum = Number($("#example_id").val()),
			dis_coint = 0,
			mark_0 = $(".mark_0"),
			mark_20 = $(".mark_20"),
			mark_40 = $(".mark_40"),
			mark_60 = $(".mark_60"),
			mark_80 = $(".mark_80")
		;
		//console.log(example_idNum);

		if (example_idNum <= 23) {
			dis_coint = 0;
		}
		if ((example_idNum >= 24) && (example_idNum <= 43) ){
			dis_coint = 3;
		}
		if ((example_idNum >= 44) && (example_idNum <= 63)){
			dis_coint = 5;
		}
		if ((example_idNum >= 64) && (example_idNum <= 86)){
			dis_coint = 7;
		}
		if (example_idNum >= 87){
			dis_coint = 10;
		}

		switch (dis_coint){
			case 0 :
				discount_value.html("0%");
				mark_0.css("color", "#7a2165");
				mark_20.css("color", "#b7b7b7");
				mark_40.css("color", "#b7b7b7");
				mark_60.css("color", "#b7b7b7");
				mark_80.css("color", "#b7b7b7");
				console.log("1");
				break;
			case 3 :
				discount_value.html("3%");
				mark_0.css("color", "#7a2165");
				mark_20.css("color", "#7a2165");
				mark_40.css("color", "#b7b7b7");
				mark_60.css("color", "#b7b7b7");
				mark_80.css("color", "#b7b7b7");
				console.log("2");
				break;
			case 5 :
				discount_value.html("5%");
				mark_0.css("color", "#7a2165");
				mark_20.css("color", "#7a2165");
				mark_40.css("color", "#7a2165");
				mark_60.css("color", "#b7b7b7");
				mark_80.css("color", "#b7b7b7");
				console.log("3");
				break;
			case  7 :
				discount_value.html("7%");
				mark_0.css("color", "#7a2165");
				mark_20.css("color", "#7a2165");
				mark_40.css("color", "#7a2165");
				mark_60.css("color", "#7a2165");
				mark_80.css("color", "#b7b7b7");
				console.log("4");
				break;
			case  10 :
				discount_value.html("10%");
				mark_0.css("color", "#7a2165");
				mark_20.css("color", "#7a2165");
				mark_40.css("color", "#7a2165");
				mark_60.css("color", "#7a2165");
				mark_80.css("color", "#7a2165");
				console.log("5");
				break;
			default:
				discount_value.html("3%");
				break;
		}
	})
	$("#dillers").on("change", function () {
		var dillers = $("#dillers").val(),
			deff_map = $("#deff_map"),
			kiev = $("#kiev"),
			zaporoj = $("#zaporoj");

		switch (dillers) {
			case "0":
				kiev.css("display", "block");
				zaporoj.css("display", "none");
				break;
			case "1":
				kiev.css("display", "block");
				zaporoj.css("display", "none");
				break;
			case "2":
				kiev.css("display", "none");
				zaporoj.css("display", "block");
				break;
			default:
				return false;
		}
	})

	$.each($(".usera"),function(){
		if($("input", this).is(':checked')){
			$(this).addClass("checked")}});
	$(".usera").click(function(){
		$(this).toggleClass("checked");
		var path = $("input", this);
		if(path.is(':checked')){
			path.attr("checked", false);
		}else{ path.attr("checked", true)}});

	$.each($(".descripte"),function(){
		if($("input", this).is(':checked')){
			$(this).addClass("checked")}});
	$(".descripte").click(function(){
		$(this).toggleClass("checked");
		var path = $("input", this);
		if(path.is(':checked')){
			path.attr("checked", false);
		}else{ path.attr("checked", true)}});

	/*$.each($(".tackeAway"),function(){
		if($("input", this).is(':checked')){
			$(this).addClass("checked")}});
	$(".tackeAway").click(function(){
		$(this).toggleClass("checked");
		var path = $("input", this);
		if(path.is(':checked')){
			path.attr("checked", false);
		}else{ path.attr("checked", true)}});*/

	$(".ro_tackeAway").change(function(){
		if($(this).is(":checked")){
			$(".RadioSelected:not(:checked)").removeClass("RadioSelected");
			$(this).next("label").addClass("RadioSelected");
		}
	});
});
$(function(){
	//$('textarea').autogrow();
	$('textarea').autogrow({vertical: true, horizontal: false});
	//$('.callback textarea').autogrow({vertical: false, horizontal: true});
	//$('textarea').autogrow({flickering: false});
});