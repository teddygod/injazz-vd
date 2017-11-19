'use strict';

// Модуль каталога с пагинацией
var catalogPag = (function($) {

    var ui = {
        $categoryBtn: $('.js-category'),
        $themeBtn: $('.js-theme'),
        $limit: $('#pages-limit'),
        $pag: $('#pagination'),
        $goods: $('#goods'),
        $goodsInfo: $('#goods-info')
    };
    var goodsTemplate = {
        big: _.template($('#goods-template-big').html()),
        compact: _.template($('#goods-template-compact').html()),
        list: _.template($('#goods-template-list').html())
    },
        pagTemplate = _.template($('#pagination-template').html());


    // Инициализация модуля
    function init() {
        _setTheme();
        _getData({
            resetPage: true
        });
        _bindHandlers();
    }

    // Устанавливаем тему
    function _setTheme() {
        var theme = localStorage.getItem('theme') || 'compact';
        $('.js-theme[data-theme="' + theme + '"]').addClass('active');
    }

    // Привязка событий
    function _bindHandlers() {
        ui.$categoryBtn.on('click', _changeCategory);
        ui.$themeBtn.on('click', _changeTheme);
        ui.$limit.on('change', _changeLimit);
        ui.$pag.on('click', 'a', _changePage);
    }

    // Смена категории
    function _changeCategory(e) {
        var $category = $(e.target);
        ui.$categoryBtn.removeClass('active');
        $category.addClass('active');

        _getData({
            resetPage: true
        });
    }

    // Смена вида каталога (темы)
    function _changeTheme(e) {
        var $theme = $(e.target).closest('button'),
            theme = $theme.attr('data-theme');
        ui.$themeBtn.removeClass('active');
        $theme.addClass('active');

        _getData({
            resetPage: false
        });

        localStorage.setItem('theme', theme);
    }

    // Смена лимита
    function _changeLimit() {
        _getData({
            resetPage: true
        });
    }

    // Смена страницы
    function _changePage(e) {
        e.preventDefault();
        e.stopPropagation();

        var $page = $(e.target).closest('li');
        ui.$pag.find('li').removeClass('active');
        $page.addClass('active');

        _getData();
    }

    // Получение опций-настроек для товаров
    function _getOptions(resetPage) {
        var categoryId = +$('.js-category.active').attr('data-category'),
            page = !resetPage ? +ui.$pag.find('li.active').attr('data-page') : 1,
            limit = +ui.$limit.val();

        return {
            category: categoryId,
            page: page,
            limit: limit
        }
    }

    // Получение данных
    function _getData(options) {
        var resetPage = options && options.resetPage,
            options = _getOptions(resetPage);
        $.ajax({
            url: 'scripts/catalog_pag.php',
            data: options,
            type: 'GET',
            cache: false,
            dataType: 'json',
            success: function(response) {
                if (response.code === 'success') {
                    _renderCatalog(response.data.goods);
                    _renderPagination({
                        page: options.page,
                        limit: options.limit,
                        countAll: response.data.countAll,
                        countItems: response.data.goods.length
                    });
                } else {
                    console.error('Произошла ошибка');
                }
            }
        });
    }

    // Рендер каталога
    function _renderCatalog(goods) {
        var theme = $('.js-theme.active').attr('data-theme');
        ui.$goods.html(goodsTemplate[theme]({goods: goods}));
    }

    // Рендер пагинации
    function _renderPagination(options) {
        var countAll = options.countAll,
            countItems = options.countItems,
            page = options.page,
            limit = options.limit,
            countPages = Math.ceil(countAll / limit),
            start = (page - 1) * limit + 1,
            end = start + countItems - 1;

        // Информация о показываемых товарах
        var goodsInfoMsg = start + ' - ' + end + ' из ' + countAll;
        ui.$goodsInfo.text(goodsInfoMsg);

        // Рендер пагинации
        ui.$pag.html(pagTemplate({
            page: page,
            countPages: countPages
        }));
    }

    // Экспортируем наружу
    return {
        init: init
    }
    
})(jQuery);