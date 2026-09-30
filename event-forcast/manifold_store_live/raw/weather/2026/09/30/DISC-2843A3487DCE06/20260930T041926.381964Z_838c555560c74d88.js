$(document).ready(function(){
    
    //the href is not needed when javascript is on
    $("a.nav-menu-link").attr("href","#");
    
    
    /************* MAIN MENU *************/
    //global nav menu
    $("a.nav-menu-link").click(function(){
        var dropdownOpen = false;
        //check if clicked menu is already dropped open - close if it is
        if ( $(this).parents(".dropdown").hasClass("active") ){
            //console.log("dropdown open");
            dropdownOpen = true;
        } else {
            //console.log("dropdown closed");
        }
        //this must be done after checking if active already exists
        $("li.dropdown").removeClass("active");
        if (!dropdownOpen){
            $("#menu").addClass("active");
            $(this).parents(".dropdown").toggleClass("active");
            $(this).next("dropdown-menu").toggleClass("active");
        }
    });
    
    $("#m-menu .navbar-toggle").click(function(){
        $("#menu").toggleClass("active");
    });
    
    $(document).click(function(evt) {
        var target = $(evt.target);
        var targetId = $(target).attr("id");
        var isOpened = $("li.dropdown").hasClass("active");
        var isMenuLink = $(target).hasClass("nav-menu-link");
        var isNOAASearch = false;

        //check if click is anywhere on search form
        if ( $(target).parents("#menu-search").length ){
            isNOAASearch = true;
        }
        if (isOpened && !isMenuLink && !isNOAASearch) {
            $("li.dropdown").removeClass("active");
        }
        
    });
    /************* END MAIN MENU *************/ 

});