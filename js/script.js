function DoSearch(terms) {
    // get search terms, results much match all terms
    var needles = new Array();
    var x;
    for (x=0;x<terms.length;x++) {
      needles[x] = new RegExp(terms[x],"i");
    }
    
    // go to search mode
    jQuery('ul.resourceslist').removeClass('mode-browse').addClass('mode-search');
    
    // check each resource
    jQuery(".view-res-nodes .views-row").each(function(){
      // get the text of the link and description
      var linktext = jQuery(this).find('.views-field-field-resource-link a').text();
      var desctext = jQuery(this).find('.views-field-field-link-description').text();
      var match = true;
      var x;
      
      // if any needle in the array is not in the text, the match is false
      for (x=0;x<needles.length;x++) {
        if (!needles[x].test(linktext) & !needles[x].test(desctext)) {
          match = false;
        }
      }
      
      // designate the resource
      if (match === true) {
        jQuery(this).addClass('result');
      }
      else {
        jQuery(this).addClass('noresult');
      }
    });
    
    // show or hide taxonomy terms
    jQuery('h3.views-field-name').each(function(){
      if (jQuery(this).parent().find('.result').length == 0) {
        jQuery(this).parent().addClass('noresults');
      }
    });
  }
  
  function ClearSearch() {
    jQuery('.views-row.result').removeClass('result');
    jQuery('.views-row.noresult').removeClass('noresult');
    jQuery('li.noresults').removeClass('noresults');
    jQuery('ul.resourceslist').removeClass('mode-search').addClass('mode-browse');
  }
  
  function Init() {
    jQuery('.resourceslist-wrapper').find('ul').eq(0).addClass('resourceslist').addClass('mode-browse');
    jQuery('.views-field-name').siblings('.item-list').addClass('childlist');
    jQuery('.view-res-nodes .views-field-field-link-description').addClass('tip');
  }
  
  jQuery('form.search').submit(function(){
    if (jQuery(this).find('.terms').eq(0).val() != '') {
      var t = jQuery(this).find('.terms').eq(0).val().split(" ");
      ClearSearch();
      DoSearch(t);
    }
    return false;
  });
  
  jQuery('form.search .clear').click(function(){
    if (jQuery('form.search').hasClass('active')) {
      ClearSearch();
      jQuery('form.search .terms').val('');
      jQuery('form.search').removeClass('active');
    }
  });
  
  jQuery('form.search .terms').on('change',function(){
    if (jQuery('form.search .terms').val() != '') {
      jQuery('form.search').addClass('active');
    }
    else {
      jQuery('form.search').removeClass('active');
    }
  });
  
  //jQuery(document).on('click.browsename', '.mode-browse .views-field-name', function() {
  //  jQuery(this).siblings('.view-res-nodes, .childlist').toggleClass('open');
  //});
  
  jQuery(document).delegate('.mode-browse .views-field-name','click.browsename',function() {
    // close open lists in sibling elements
    jQuery(this).parent().siblings().children('.open').toggleClass('open');
                  
      // toggle open and (if closing) close any open sublists 
      jQuery(this).toggleClass('open').siblings('.view-res-nodes, .childlist').toggleClass('open').find('.open').toggleClass('open');
                
      // scrollto
    if (jQuery('.view-res-nodes.open').length > 0) {
      var s = jQuery('.view-res-nodes.open').last().offset().top - 100; // console.log(s);
          jQuery('body,html').animate({'scrollTop':s},500,'swing');
      }
  });
  
  
  jQuery(document).ready(function(){
    Init();
  });