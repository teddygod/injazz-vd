/**
 * Created by teddygod on 10.09.2017.
 */

function Tabs(sSelector) {
	var t = this;

	//Data
	t.main        = $(sSelector);
	t.tabLink     = t.main.find('.tabs__controls-link');
	t.tabListItem = t.main.find('.tabs__content-item');
	//Logic
	t.changeTab = function (sItemLink) {
		var  currentControlItem = $(sItemLink).closest('.tabs__controls-item')
			,currentIndex = currentControlItem.index()
		;
		if ( !currentControlItem.hasClass('tabs__controls-item_disabled') ) {
			t.tabListItem.eq(currentIndex)
				.add(currentControlItem)
				.addClass('active')
				.siblings()
				.removeClass('active')
			;
			t.tabListItem.eq(currentIndex).css({
				"opacity" : 0
			});
			t.tabListItem.eq(currentIndex).animate({
					"opacity" : 1
				}
				, 800
			);
		}
	}
	t.clickTab = function (event) {
		event.preventDefault();
		var curItem = $(this);
		t.changeTab(curItem);
	}

	//Events
	// t.main.find('.tabs__controls-link').bind('click', t.clickTab);
	t.main.find('.tabs__controls-link').bind('click', t.clickTab);
}

