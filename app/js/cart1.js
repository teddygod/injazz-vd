"use strict";

function Cart(sSelector, sCartSelector, sCounterSelector, sPdCartSelector) {

	var basketUrl = '/ru/basket.json';
	var c = this;
	// data
	c.ajTimeout = 5000;
	c.minicart = $(sCartSelector);
	c.minicartCounter = $(sCounterSelector);
	c.arSelects = [];
	// logic


	c.minicartRender = function(json) {
		var curMinicart = c.minicart.find(".c-item_minicart:not(:first)");
		var	compAr = [];

		function clone(obj) {
			var copy;

			// Handle the 3 simple types, and null or undefined
			if (null == obj || "object" != typeof obj) return obj;

			// Handle Date
			if (obj instanceof Date) {
				copy = new Date();
				copy.setTime(obj.getTime());
				return copy;
			}

			// Handle Array
			if (obj instanceof Array) {
				copy = [];
				for (var i = 0, len = obj.length; i < len; i++) {
					copy[i] = clone(obj[i]);
				}
				return copy;
			}

			// Handle Object
			if (obj instanceof Object) {
				copy = {};
				for (var attr in obj) {
					if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
				}
				return copy;
			}

			throw new Error("Unable to copy obj! Its type isn't supported.");
		}

		var oGoods = clone(json.goods);

		if (Object.keys(oGoods).length !== 0) {
			curMinicart.each(function(index, el) {
				var item = $(el);

				for (var key in oGoods) {

					if (item.data("id") == key) {
						if (item.find('.select').length > 0) {
							item.addClass('c-item_minicart_to-del');
						} else {
							c.goodCompresion(item, oGoods[key].priceSum, oGoods[key].count, oGoods[key].packCount);
							compAr.push(item.data("id"));
						}
					} else {
						(!oGoods[item.data("id")]) ? item.addClass('c-item_minicart_to-del') : false;
					}
				}
			});

			for (var i = 0; i < compAr.length; i++) delete oGoods[compAr[i]];

			for (var i = 0; i < c.arSelects.length; i++) delete c.arSelects[i];

			c.arSelects = new Array();

			c.minicart.find(".c-item_minicart_to-del").remove();

			for (var id in oGoods) c.addMinicartItem(id, oGoods[id]);

			c.renderTbTotal(json.total);

			c.minicartCounter.html(json.count).addClass("btn-basket__count_in-animation");
			var tmm = setTimeout(function() {
					c.minicartCounter.removeClass("btn-basket__count_in-animation");
					clearTimeout(tmm);
				},
				1000
			);
			c.minicart.removeClass("minicart_js_state_empty");
		} else {
			c.minicart.find(".c-item_minicart:not(:first)").remove();
			c.renderTbTotal(json.total);
			c.minicart.addClass("minicart_js_state_empty");
			// c.minicartCounter.html(json.count);
			c.minicartCounter.html(json.count).addClass("btn-basket__count_in-animation");
			var tmm = setTimeout(function() {
					c.minicartCounter.removeClass("btn-basket__count_in-animation");
					clearTimeout(tmm);
				},
				1000
			);
		}
	}

	c.renderTbTotal = function(oTotal) {
		// c.minicart.find(".tb-total-price__price").html(oTotal.price);
		// c.minicart.find(".tb-total-price__discount").html(oTotal.discount);
		c.minicart.find(".tb-total-price__sum .price_sum_val").html(oTotal.total);
	}

	c.addMinicartItem = function(dataId, oGood, oTotal) {

		var jqCartGood = c.minicart.find(".c-item_minicart:first-child")
			.clone()
			.appendTo(c.minicart.find(".c-item_minicart:first-child").parent());

		// record  to card

		jqCartGood.attr("data-id", dataId);
		jqCartGood.attr("data-prid", oGood.prid);
		jqCartGood.find(".c-item__link-img-wrap").attr("href", oGood.cartUrl);
		jqCartGood.find(".c-item__img").attr("src", oGood.img.src);
		jqCartGood.find(".c-item__img").attr("alt", oGood.img.alt);
		jqCartGood.find(".c-item__title-link").attr("href", oGood.cartUrl).children().html(oGood.title);
		jqCartGood.find(".c-item__price-count").html(oGood.price);
		// jqCartGood.find(".i-price-old__currency").html(oGood.priceOld);
		jqCartGood.find(".i-articule__code").html(oGood.vCode);
		jqCartGood.find(".i-order-form__quantity").val(oGood.count);
		jqCartGood.find(".i-order-form__quantity_pack").val(oGood.packCount);
		jqCartGood.find(".i-price-sum__num").html(oGood.priceSum);

		/* if ( oGood.options !== false && oGood.options !== undefined) {
		 jqCartGood.find(".c-item__counter").children('.i-order-form').remove();
		 c.selectRender(jqCartGood, oGood.options, oGood.prids, oGood.quantity, oGood.optionSelected);
		 } else {
		 jqCartGood.find(".c-item__counter").children('.select-block').remove();
		 }*/

		//console.log("oGood", oGood);
		// debugger;

		// render cart of type 1,2,3

		if ((oGood.options !== undefined && oGood.options !== false) && (oGood.packCount !== undefined && oGood.packQuant !== false)) {

			console.log("true optionTwins");

			jqCartGood.find(".i-order-form__quantity_pack").parent().addClass('twins');
			jqCartGood.find(".i-order-form__quantity_pack").parent().css('margin-top', 5);
			jqCartGood.find(".c-item__counter").children('.i-order-form').remove();
			c.selectRender(jqCartGood, oGood.options, oGood.prids, oGood.quantity, oGood.optionSelected);

		} else if (oGood.packCount !== undefined && (oGood.options !== false && oGood.options !== undefined) && oGood.packQuant !== true) {

			console.log("true options");

			jqCartGood.find(".c-item__counter").children('.i-order-form').remove();
			jqCartGood.find(".c-item__counter").children('.i-order-form_pack').remove();
			c.selectRender(jqCartGood, oGood.options, oGood.prids, oGood.quantity, oGood.optionSelected);
			//c.selectRender(jqCartGood, oGood.options, oGood.optionSelected);

		} else {

			//console.log("false options");

			jqCartGood.find(".c-item__counter").children('.select-block').remove();
			jqCartGood.find(".c-item__counter").children('.i-order-form_pack').remove();
		}

	}
	//render selectors cart 2
	c.selectRender = function(jqGood, options, prids, quantity, optionSelected) {
		var selectBlock = jqGood.find('.select-block'),
			htmlSelect = jqGood.find('.select'),
			id = jqGood.attr("data-id")
			// ,oSelect      = {}
			,
			flagSelected = false;
		for (var key in options) {

			var itemKey = Object.keys(options[key]);

			if (optionSelected !== undefined) {
				if (Object.keys(optionSelected).length > 0) {
					for (var sKey in optionSelected) {

						//console.log(optionSelected, sKey, optionSelected[sKey], options[key][itemKey[0]], '-----');

						if (sKey === itemKey[0] && optionSelected[sKey] === options[key][itemKey[0]]) {

							htmlSelect.append("<option data-prid='" +
								itemKey[0] +
								"' selected='selected' value='" +
								quantity[itemKey[0]] +
								"'>" +
								options[key][itemKey[0]] +
								"</option>");
							flagSelected = true;
						} else {
							htmlSelect.append("<option data-prid='" +
								itemKey[0] +
								"' value='" +
								quantity[itemKey[0]] +
								"'>" +
								options[key][itemKey[0]] +
								"</option>");
						}
					}
				} else {
					htmlSelect.append("<option data-prid='" +
						itemKey[0] +
						"' value='" +
						quantity[itemKey[0]] +
						"'>" +
						options[key][itemKey[0]] +
						"</option>");
				}
			} else {
				htmlSelect.append("<option data-prid='" +
					itemKey[0] +
					"' value='" +
					quantity[itemKey[0]] +
					"'>" +
					options[key][itemKey[0]] +
					"</option>");
			}
		}

		if (flagSelected !== true) htmlSelect.children().eq(1).attr("selected", "selected");
		selectBlock.attr("id", "select-block_" + id);
		c.arSelects.push(new Selectblock("#select-block_" + id));
	}

	// ХЗ
	c.goodCompresion = function(item, iGoodSum, iGoodQty, iGoodsPackQty) {


		var curQty = item.find(".i-order-form__quantity")
			//,curPackQty = item.find(".i-order-form__quantity_pack")
			,
			curSum = item.find(".i-price-sum__num");
		if (Number(curQty.val()) !== Number(iGoodQty)) curQty.val(iGoodQty);
		//if ( Number(curPackQty.val()) !== Number(iGoodsPackQty) ) curPackQty.val(iGoodsPackQty);
		if (Number(curSum.html()) !== Number(iGoodSum)) curSum.html(iGoodSum);
	}
	// onload events
	c.load = function() {

		c.ajaxRequest(basketUrl,
			c.ajTimeout,
			{
				"minicart": 1
			},
			function(json) {
				if (json.goods !== undefined && json.total !== undefined && json.count !== undefined) {
					c.eventUnbinder();
					c.minicartRender(json);
					c.eventBinder();
					if (Object.keys(json.goods).length > 0) {
						// c.minicartCounter.parent(".cart.modal-show")
						//                  .removeClass("modal-show_disabled");
					}
				} else if (Object.keys(json.goods).length == 0) {
					c.minicartRender(json);
					// c.minicartCounter.parent(".cart.modal-show")
					//                  .addClass("modal-show_disabled");
				}
			});
	}
	// counter for cart in all
	c.orderCounter = function(event) {
		event.preventDefault();
		var curBtn = $(this),
			inputQty = curBtn.parent('[class^="i-order-form"]').find('> input[class^="i-order-form"]'),
			qty = Number(inputQty.val()),
			access = c.inputQtyValidate(inputQty)
			//console.log(inputQty);
		;
		if (access == "success") {
			if (curBtn.hasClass('i-order-form__plus')) {
				qty++;
				inputQty.val(qty.toFixed(0));
			} else if (curBtn.hasClass('i-order-form__minus')) {
				qty--;
				(qty <= 0) ? inputQty.val(0) : inputQty.val(qty.toFixed(0));
			}
		} else return;
	}
	c.inputQtyOn = function(event) {
		var input = $(this);
		c.inputQtyValidate(input);
	}

	//c.inputQtyBlur = function (event) {}

	// Validation
	c.inputQtyValidate = function(jqInputQty) {
		var str = jqInputQty.val(), result = isNaN(str) ? true : false, access = null;
		if (result === true) {
			jqInputQty.addClass("js-validate_error").css("border-color", "#B6251A");
			access = "error";
		} else {
			jqInputQty.removeClass("js-validate_error").css("border-color", "#d9d9d9");
			access = "success";
		}
		return access;
	}

	// какая-то калькуляция при смене select`a \m/

	c.selectOnChange = function(event) {
		var curSelect = $(this);
		var selectedOption = $('option:selected', curSelect);
		var minicartItem = curSelect.parents('.c-item_minicart');
		var	dataId = minicartItem.data("id");
		var	dataPrid = selectedOption.data("prid");
		var	inputPackCount = minicartItem.find(".i-order-form__quantity_pack");
		var	packCount = Number(inputPackCount.val()).toFixed(0);
		var	qty = selectedOption.val();

		c.ajaxRequest(basketUrl,
			c.ajTimeout,
			{
				"id": dataId,
				"count": qty, "prid": dataPrid,
				"packCount": packCount
			},
			function(json) {

				if (json.goods !== undefined && json.total !== undefined && json.count !== undefined) {
					c.eventUnbinder();
					c.minicartRender(json);
					c.eventBinder();

					if (Object.keys(json.goods).length > 0) {
						// c.minicartCounter.parent(".cart.modal-show")
						//                  .removeClass("modal-show_disabled");
					}
				} else if (Object.keys (json.goods).length == 0) {
					c.minicartRender(json);
					// c.minicartCounter.parent(".cart.modal-show")
					//                  .addClass("modal-show_disabled");
				}

			});
	}

	//TODO: order send to serveer

	c.orderSend = function(event) {
		event.preventDefault();
		var curBtn = $(this);
		var minicartItem = curBtn.parents('.c-item_minicart');
		var dataId = minicartItem.data("id");
		var dataPrid = minicartItem.data("prid");
		var packCount = 1;

		var inputQtyForm = curBtn.parent('[class^="i-order-form"]');
		var inputQty = inputQtyForm.find('[class^="i-order-form__quantity"]:visible');
		var qty = Number(inputQty.val()).toFixed(0);

		var inputPackQty = inputQtyForm.find('.i-order-form__quantity_pack');
		if (inputPackQty.length) {
			packCount = qty;
			qty = minicartItem.find('.select-block__item').data('value');
		}
		//var amount = +qty * +packCount;

		var access = c.inputQtyValidate(inputQty);

		event.preventDefault();

		if (access == "success") {

			c.ajaxRequest(basketUrl,
				c.ajTimeout,
				{
					"id": dataId,
					"count": qty,
					"prid": dataPrid,
					"packCount": packCount

				},
				function(json) {

					if (json.goods !== undefined && json.total !== undefined && json.count !== undefined) {
						c.eventUnbinder();
						c.minicartRender(json);
						c.eventBinder();
						if (Object.keys(json.goods).length > 0) {
							// c.minicartCounter.parent(".cart.modal-show")
							//                  .removeClass("modal-show_disabled");
						}
					} else if (Object.keys(json.goods).length == 0) {
						c.minicartRender(json);
						// c.minicartCounter.parent(".cart.modal-show")
						//                  .addClass("modal-show_disabled");
					}
				});
		} else return;

	}
	c.delMinicartItem = function(event) {
		event.preventDefault();
		var dataId = $(this).parents('.c-item_minicart').data("id");

		c.ajaxRequest(basketUrl,
			c.ajTimeout,
			{
				"id": dataId,
				"count": 0
			},
			function(json) {

				if (json.goods !== undefined && json.total !== undefined && json.count !== undefined) {
					c.eventUnbinder();
					c.minicartRender(json);
					c.eventBinder();
					if (Object.keys(json.goods).length > 0) {
						// c.minicartCounter.parent(".cart.modal-show")
						//                  .removeClass("modal-show_disabled");
					}
				} else if (Object.keys(json.goods).length == 0) {
					c.minicartRender(json);
					// c.minicartCounter.parent(".cart.modal-show")
					//                  .addClass("modal-show_disabled");
				}
			});
	}
	c.eventUnbinder = function() {
		c.minicart.find(".i-order-form__plus").unbind('mousedown');
		c.minicart.find(".i-order-form__plus").unbind('mouseup');
		c.minicart.find(".i-order-form__plus_pack").unbind('mousedown');
		c.minicart.find(".i-order-form__plus_pack").unbind('mouseup');
		c.minicart.find(".i-order-form__quantity").unbind('input');
		c.minicart.find(".i-order-form__quantity").unbind('blur');
		//c.minicart.find(".i-order-form__quantity_pack").unbind('input');
		//c.minicart.find(".i-order-form__quantity_pack").unbind('blur');
		c.minicart.find(".i-order-form__minus").unbind('mousedown');
		c.minicart.find(".i-order-form__minus").unbind('mouseup');
		c.minicart.find(".i-order-form__minus_pack").unbind('mousedown');
		c.minicart.find(".i-order-form__minus_pack").unbind('mouseup');
		c.minicart.find(".c-item__btn-del").unbind('click');
		c.minicart.find(".select").unbind('change', c.selectOnChange);
	}
	c.eventBinder = function() {
		c.minicart.find(".i-order-form__plus").bind('mousedown', c.orderCounter);
		c.minicart.find(".i-order-form__plus").bind('mouseup', c.orderSend);
		c.minicart.find(".i-order-form__plus_pack").bind('mousedown', c.orderCounter);
		c.minicart.find(".i-order-form__plus_pack").bind('mouseup', c.orderSend);
		c.minicart.find(".i-order-form__quantity").bind('input', c.inputQtyOn);
		c.minicart.find(".i-order-form__quantity").bind('blur', c.orderSend);
		//c.minicart.find(".i-order-form__quantity_pack").bind('input',  c.inputPackQtyOn );
		//c.minicart.find(".i-order-form__quantity_pack").bind('blur',  c.orderPackSend);
		c.minicart.find(".i-order-form__minus").bind('mousedown', c.orderCounter);
		c.minicart.find(".i-order-form__minus_pack").bind('mousedown', c.orderCounter);
		c.minicart.find(".i-order-form__minus").bind('mouseup', c.orderSend);
		c.minicart.find(".i-order-form__minus_pack").bind('mouseup', c.orderSend);
		c.minicart.find(".c-item__btn-del").bind('click', c.delMinicartItem);
		c.minicart.find(".select").bind('change', c.selectOnChange);
	}
	c.ajaxRequest = Customajax.prototype.ajaxRequest;

	//-------
	if (sSelector.length) {
		c.init(sSelector);
		c.goods = c.elem.find(".c-item");
		// log
		c.clickBuyBtn = function(event) {
			event.preventDefault();

			c.ajaxRequest(basketUrl,
				c.ajTimeout,
				{
					"id": $(this).parents(".c-item").data("id"),
					"count": 1,
					"prid": $(this).parents(".c-item").data("prid"),
					"packCount": 1

				},
				function(json) {

					if (json.goods !== undefined && json.total !== undefined && json.count !== undefined) {
						c.eventUnbinder();
						c.minicartRender(json);
						c.eventBinder();
						if (Object.keys(json.goods).length > 0) {
							// c.minicartCounter.parent(".cart.modal-show")
							//                  .removeClass("modal-show_disabled");
						}
					} else if (Object.keys(json.goods).length == 0) {
						c.minicartRender(json);
						// c.minicartCounter.parent(".cart.modal-show")
						//                  .addClass("modal-show_disabled");
					}
				}
			);
		}
		// evt
		c.goods.find(".btn_add-to-basket").bind('click', c.clickBuyBtn);
	}
	if (sPdCartSelector.length) {
		c.pCart = $(sPdCartSelector);
		// log
		c.clickBuyBtnpCart = function(event) {

			event.preventDefault();

			var inputQty = c.pCart.find(".i-order-form__quantity"),
				access = c.inputQtyValidate(inputQty),
				selectHtml = c.pCart.find(".select"),
				inputPackCount = c.pCart.find(' input[class$="_pack"]'),
				qty, packCount = 1,
				prid = null;

			if (selectHtml.length && inputPackCount !== undefined) {
				qty = selectHtml.children("option[selected='selected']").val();
				packCount = Number(inputPackCount.val()).toFixed(0);
				prid = selectHtml.children("option[selected='selected']").data('prid');
				//access = "success";
			} else if (selectHtml.length && inputPackCount === undefined) {
				qty = selectHtml.children("option[selected='selected']").val();
				prid = selectHtml.children("option[selected='selected']").data('prid');
				access = "success";
			} else {
				qty = Number(inputQty.val()).toFixed(0);
				prid = inputQty.data('prid');
			}

			if (access == "success") {

				c.ajaxRequest(basketUrl,
					c.ajTimeout,
					{
						"id": c.pCart.data("id"),
						"prid": prid,
						"count": qty,
						"packCount": packCount
					},
					function(json) {

						// console.log(json);
						// debugger;
						// console.log('callback responce - ', json);

						if (json.goods !== undefined && json.total !== undefined && json.count !== undefined) {
							c.eventUnbinder();

							// console.log(json);

							c.minicartRender(json);

							c.eventBinder();
							// alert("ZDES");

							if (Object.keys(json.goods).length > 0) {
								// c.minicartCounter.parent(".cart.modal-show")
								//                 .removeClass("modal-show_disabled");
							}
						} else if (Object.keys(json.goods).length == 0) {

							c.minicartRender(json);
							// c.minicartCounter.parent(".cart.modal-show")
							//                  .addClass("modal-show_disabled");
						}
					}
				);
			} else return;

		}
		// evt
		c.pCart.find(".btn_add-to-basket").bind("click", c.clickBuyBtnpCart);
		c.pCart.find(".i-order-form__plus").bind('click', c.orderCounter);
		//c.pCart.find(".i-order-form__plus").bind('click', c.orderPackCounter);
		c.pCart.find(".i-order-form__minus").bind('click', c.orderCounter);
		//c.pCart.find(".i-order-form__minus").bind('click', c.orderPackCounter);
		c.pCart.find(".i-order-form__quantity").bind('input', c.inputQtyOn);
		//c.pCart.find(".i-order-form__quantity_pack").bind('input', c.inputPackQtyOn);
	}
	//-------

	// events
	c.load(); // getDefaultMinicart;
	c.eventUnbinder();
	c.eventBinder();
}

Cart.prototype = Object.create(component.prototype);
Cart.prototype.constructor = Cart;


$(function() {
	var price = $('#item-price');
	var packagePrice = $('.select-block_product-cart select');

	packagePrice.on('change',
		function() {
			price.html(packagePrice.find(':selected').data('cost'));
		})


});