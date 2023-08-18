    window.onload = function() {
        var sidebarWidth = document.querySelector('.sidenav').offsetWidth;
        document.querySelector('.page').style.marginLeft = sidebarWidth + 'px';
    }
    
    window.onresize = function() {
        var sidebarWidth = document.querySelector('.sidenav').offsetWidth;
        document.querySelector('.page').style.marginLeft = sidebarWidth + 'px';
    }
