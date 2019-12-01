
// Импортируем другие js-файлы


$(document).ready(function(){
  $('.menu__triger').click(function(){
    $('#main_nav').toggleClass('open');
  });
  $('.toggleSidebar').click(function(){
    $('.ant-drawer-left').show();
  });
  $('.ant-drawer-mask').click(function(){
    $('.ant-drawer').hide();
  });
  $('.Filter_Icon').click(function(){
    $('.ant-drawer-right').show();
    console.log($('.ant-drawer-right'));
  });
  $('#grid_view').click(function(){
    $(this).addClass('active');
    $('#list_view').removeClass('active');
    $('#product_view_block').removeClass('list_view');
  });
  $('#list_view').click(function(){
    $(this).addClass('active');
    $('#grid_view').removeClass('active');
    $('#product_view_block').addClass('list_view');
  });
});
function viewList(){
    document.getElementById('product_view_block').classList.add('list_view');
    document.getElementById('grid_view').classList.remove('active');
    document.getElementById('list_view').classList.add('active');
  }
  function viewGrid(){
  document.getElementById('product_view_block').classList.remove('list_view');
    document.getElementById('list_view').classList.remove('active');
    document.getElementById('grid_view').classList.add('active');;
  }
$('.anticon-plus').click(function(){
    let value = $(this).parent().siblings('#item_count').html();
    console.log(value);
    value = parseInt(value) + 1;
    $(this).parent().siblings('#item_count').html(value);
});
$('.anticon-minus').click(function(){
  let value = $('#item_count').html();
  
  if(value == '0'){
    value = 0;
  }else{
    value = parseInt(value) - 1;
  }
  $('#item_count').html(value);
});