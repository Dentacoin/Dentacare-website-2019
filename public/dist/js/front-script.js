var basic={options:{alert:null},init:function(e){},cookies:{set:function(e,t){null==e&&(e="cookieLaw"),null==t&&(t=1);var i=new Date;i.setTime(i.getTime()+864e6);var n="expires="+i.toUTCString();document.cookie=e+"="+t+"; "+n+";path=/","cookieLaw"==e&&$(".cookies_popup").slideUp()},erase:function(e){document.cookie=e+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"},get:function(e){if(null==e)e="cookieLaw";e+="=";for(var t=document.cookie.split(";"),i=0;i<t.length;i++){for(var n=t[i];" "==n.charAt(0);)n=n.substring(1);if(0==n.indexOf(e))return n.substring(e.length,n.length)}return""}},fixPlaceholders:function(){$("input[data-placeholder]").each(function(){null==$(this).data("placeholders-fixed")&&($(this).data("placeholders-fixed",!0),basic.setInputsPlaceholder($(this)),$focus_function="if($(this).val()=='"+$(this).data("placeholder")+"'){ $(this).val(''); }",null!=$(this).attr("onkeydown")&&($focus_function=$(this).attr("onkeydown")+"; "+$focus_function),$(this).attr("onkeydown",$focus_function),$blur_function="if($(this).val()==''){ $(this).val('"+$(this).data("placeholder")+"'); }",null!=$(this).attr("onblur")&&($blur_function=$(this).attr("onblur")+"; "+$blur_function),$(this).attr("onblur",$blur_function))})},clearPlaceholders:function(e){null==e&&(e=""),$("input[data-placeholder]"+e).each(function(){$(this).val()==$(this).data("placeholder")&&$(this).val("")})},setPlaceholders:function(){$("input[data-placeholder]").each(function(){basic.setInputsPlaceholder($(this))})},setInputsPlaceholder:function(e){""==$(e).val()&&$(e).val($(e).data("placeholder"))},fixBodyModal:function(){$(".modal-dialog").length>0&&!$("body").hasClass("modal-open")&&$("body").addClass("modal-open")},fixZIndexBackdrop:function(){if(jQuery(".bootbox").length>1){var e=jQuery(".bootbox").eq(jQuery(".bootbox").length-2).css("z-index");jQuery(".bootbox").last().css({"z-index":e+2}).next(".modal-backdrop").css({"z-index":e+1})}},showAlert:function(e,t,i){basic.realShowDialog(e,"alert",t,null,null,i)},showConfirm:function(e,t,i,n){basic.realShowDialog(e,"confirm",t,i,null,n)},showDialog:function(e,t,i,n){void 0===i&&(i=null),basic.realShowDialog(e,"dialog",t,null,i,n)},realShowDialog:function(message,dialog_type,class_name,params,type,vertical_center){void 0===class_name&&(class_name=""),void 0===type&&(type=null),void 0===vertical_center&&(vertical_center=null);var atrs={message:message,animate:!1,show:!1,className:class_name};if("confirm"==dialog_type&&null!=params&&null==params.buttons&&(atrs.buttons={confirm:{label:"Yes",className:"btn-success"},cancel:{label:"No",className:"btn-danger"}}),null!=params)for(var key in params)atrs[key]=params[key];var dialog=eval("bootbox."+dialog_type)(atrs);dialog.on("hidden.bs.modal",function(){basic.fixBodyModal(),null!=type&&$('.single-application figure[data-slug="'+type+'"]').parent().focus()}),dialog.on("shown.bs.modal",function(){null!=vertical_center&&basic.verticalAlignModal(),basic.fixZIndexBackdrop()}),dialog.modal("show")},verticalAlignModal:function(e){$("body .modal-dialog").each(function(){$(this).css("margin-top",Math.max(20,($(window).height()-$(this).height())/2))})},closeDialog:function(){bootbox.hideAll()},request:{initialize:!1,result:null,submit:function(e,t,i,n,o){if(i=$.extend({type:"POST",dataType:"json",async:!0},i),!basic.request.initialize||0!=i.async)return basic.request.initialize=!0,$.ajax({url:e,data:t,type:i.type,dataType:i.dataType,async:i.async,beforeSend:function(){null!==o&&basic.addCurtain()},success:function(e){basic.request.result=e,null!==o&&basic.removeCurtain(),basic.request.initialize=!1,"function"==typeof n&&n(e)},error:function(){basic.request.initialize=!1}});console.log(["Please wait for parent request"])},validate:function(e,t,i){return null==i&&(basic.clearPlaceholders(),$(".input-error-message").remove(),i=e.serialize()),basic.request.submit(SITE_URL+"validate/",i,{async:!1},function(e){"function"==typeof t&&t()},null)},markValidationErrors:function(e,t){if(basic.setPlaceholders(),void 0===e.all_errors){if(void 0!==e.message)return basic.showAlert(e.message),!0}else{var i=JSON.parse(e.all_errors);for(var n in i){if(1==Object.keys(i).length&&0==$('[name="'+n+'"]').length)return basic.showAlert(i[n]),!1;if(null==t)var o=$('[name="'+n+'"]');else o=t.find('[name="'+n+'"]');basic.request.removeValidationErrors(o),o.closest(".input-error-message-holder")?o.closest(".input-error-message-holder").append('<div class="input-error-message">'+i[n]+"</div>"):o.after('<div class="input-error-message">'+i[n]+"</div>")}}},removeValidationErrors:function(e){e.closest(".input-error-message-holder").find(".input-error-message").remove(),e.parent().remove(".input-error-message")}},alert:function(e){basic.options.alert(e)},addCurtain:function(){$("body").prepend('<div class="curtain"></div>')},removeCurtain:function(){$("body .curtain").remove()},validateEmail:function(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)},validatePhone:function(e){return/^[\d\.\-]+$/.test(e)},validateUrl:function(e){return/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(e)},isInViewport:function(e){var t=$(e).offset().top,i=t+$(e).outerHeight(),n=$(window).scrollTop(),o=n+$(window).height();return i>n&&t<o},isMobile:function(){var e=!1;return(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))&&(e=!0),e},objHasKey:function(e,t){return!!e&&hasOwnProperty.call(e,t)},addCsrfTokenToAllAjax:function(){$.ajaxSetup({headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")}})},stopMaliciousInspect:function(){document.addEventListener("contextmenu",function(e){e.preventDefault()}),document.onkeydown=function(e){return 123!=event.keyCode&&((!e.ctrlKey||!e.shiftKey||e.keyCode!="I".charCodeAt(0))&&((!e.ctrlKey||!e.shiftKey||e.keyCode!="C".charCodeAt(0))&&((!e.ctrlKey||!e.shiftKey||e.keyCode!="J".charCodeAt(0))&&((!e.ctrlKey||e.keyCode!="U".charCodeAt(0))&&void 0))))}}},initAddressSuggesters,checkAddress,setupMap,mapsLoaded=!0,mapsWaiting=[],prepareMapFunction=function(e){mapsLoaded?e():mapsWaiting.push(e)};$(document).ready(function(e){setupMap=function(e,t){if(e.find(".suggester-map-div").show(),e.find(".suggester-map-div").attr("inited"))e.find(".suggester-map-div").data("map").panTo(t),e.find(".suggester-map-div").data("marker").setPosition(t);else{var i=new google.maps.Map(e.find(".suggester-map-div")[0],{center:t,zoom:14,backgroundColor:"none"}),n=new google.maps.Marker({map:i,icon:"/assets/images/map-pin-inactive.png",draggable:!0,position:t});n.addListener("dragend",function(t){this.map.panTo(this.getPosition()),(new google.maps.Geocoder).geocode({location:this.getPosition()},function(e,t){if("OK"==t){var i=e[0].formatted_address,n=this.find(".country-select option:selected").text();i=i.replace(", "+n,""),this.find(".address-suggester").val(i).blur()}else checkAddress(null,this)}.bind(e))}),e.find(".suggester-map-div").attr("inited",1),e.find(".suggester-map-div").data("map",i),e.find(".suggester-map-div").data("marker",n)}},initAddressSuggesters=function(){prepareMapFunction(function(){e(".address-suggester").each(function(){if(e(this).hasClass("dont-init"))return!1;var t=e(this).closest(".address-suggester-wrapper");if(t.find(".country-select").change(function(){var t=e(this).find("option:selected").val();s.setComponentRestrictions({country:t})}),t.find(".suggester-map-div").attr("lat")){var i={lat:parseFloat(t.find(".suggester-map-div").attr("lat")),lng:parseFloat(t.find(".suggester-map-div").attr("lon"))};setupMap(t,i)}var n=e(this)[0],o={componentRestrictions:{country:t.find(".country-select option:selected").val()},types:["address"]},s=new google.maps.places.Autocomplete(n,o);s.suggester_container=t,google.maps.event.addListener(s,"place_changed",function(){var e=this.getPlace();this.suggester_container.find(".address-suggester").val(e.formatted_address?e.formatted_address:e.name).blur()}.bind(s)),e(this).blur(function(t){var i=e(this).closest(".address-suggester-wrapper"),n=(i.find(".country-select option:selected").text(),i.find(".country-select option:selected").val()),o=new google.maps.Geocoder,s=e(this).val();o.geocode({address:s,region:n},function(e,t){checkAddress("OK"==t?e[0]:null,this)}.bind(i))})})}),e(".address-suggester").on("keyup keypress",function(e){if(13===(e.keyCode||e.which))return e.preventDefault(),!1})},checkAddress=function(e,t){if(t.find(".geoip-hint").hide(),t.find(".geoip-confirmation").hide(),t.find(".suggester-map-div").hide(),e&&e.geometry){var i=t.find(".address-suggester").val(),n=t.find(".country-select option:selected").text();i=i.replace(", "+n,""),t.find(".address-suggester").val(i);var o={lat:e.geometry.location.lat(),lng:e.geometry.location.lng()};return setupMap(t,o),void t.find(".geoip-confirmation").show()}t.find(".geoip-hint").show()},e(".address-suggester").length&&initAddressSuggesters()}),basic.init(),$(document).ready(function(){}),$(window).on("load",function(){}),$(window).on("load",function(){}),$(window).on("resize",function(){}),$(window).on("scroll",function(){});var mobile_os={Android:function(){return navigator.userAgent.match(/Android/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)}};function checkIfCookie(){$(".privacy-policy-cookie").length>0&&$(".privacy-policy-cookie .accept").click(function(){basic.cookies.set("privacy_policy",1),$(".privacy-policy-cookie").hide()})}function initCaptchaRefreshEvent(){$(".refresh-captcha").length>0&&$(".refresh-captcha").click(function(){$.ajax({type:"GET",url:"/refresh-captcha",dataType:"json",success:function(e){$(".captcha-container span").html(e.captcha)}})})}function successfulUserLogin(e){$(".response-layer").hide(),basic.closeDialog(),e.success?e.upgradeable_content?($(".upgradeable-html").html(e.upgradeable_content),$("form#dentacare-withdraw").on("submit",function(t){t.preventDefault();var i=$(this);i.find(".error-handle").remove();var n=i.find(".form-field"),o=!0;"true"==i.attr("data-stoppage")&&(customErrorHandle(i,"You don't have any DCN balance at the moment."),o=!1);for(var s=0,a=n.length;s<a;s+=1)""==n.eq(s).val().trim()?(customErrorHandle(n.eq(s).closest(".field-parent"),"This field is required."),o=!1):"dentacare-address"==n.eq(s).attr("name")&&42!=n.eq(s).val().trim().length&&(customErrorHandle(n.eq(s).closest(".field-parent"),"Please use valid Wallet Address."),o=!1);o&&($(".response-layer").show(),setTimeout(function(){$.ajax({type:"POST",url:"/submit-withdraw-dentacare-dcn",dataType:"json",data:{token:e.token,amount:e.amount,address:i.find('input[name="dentacare-address"]').val().trim()},headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:function(e){$(".response-layer").hide(),basic.closeDialog(),e.success?(i.find('input[name="dentacare-address"]').val(""),basic.showAlert(e.success,"",!0)):e.error&&basic.showAlert(e.error,"",!0)}})},1e3))})):basic.showAlert(e.success,"",!0):e.error&&basic.showAlert(e.error,"",!0)}if(mobile_os.iOS()?$(".android-btn").remove():mobile_os.Android()&&$(".ios-btn").remove(),checkIfCookie(),initCaptchaRefreshEvent(),$("body").hasClass("home")?($(".moving-phones-container").length&&($("body").addClass("overflow-hidden"),$(window).width()>768&&setTimeout(function(){$(".moving-phones-container").animate({left:"0"},1500,null,function(){$(".first-phone").addClass("right-rotation"),$(".second-phone").addClass("right-rotation"),$(".third-phone").addClass("left-rotation"),$(".moving-phones-container").addClass("move-back-top")})},1e3),$("body").removeClass("overflow-hidden")),$(".testimonials-slider").length>0&&$(".testimonials-slider").slick({slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:8e3,adaptiveHeight:!0}),$(".oral-care-journey-slider .init-slider").length>0&&$(".oral-care-journey-slider .init-slider").slick({slidesToShow:5,slidesToScroll:1,autoplay:!0,autoplaySpeed:4e3,responsive:[{breakpoint:992,settings:{slidesToShow:3}},{breakpoint:768,settings:{slidesToShow:1}}]})):$("body").hasClass("forgotten-password")?$("form#forgotten-password").on("submit",function(e){var t=$(this);""!=t.find('input[type="email"]').val().trim()&&basic.validateEmail(t.find('input[type="email"]').val().trim())||(basic.showAlert("Please try again with valid email.","",!0),e.preventDefault())}):$("body").hasClass("withdraw-dentacare-dcn")&&(window.fbAsyncInit=function(){FB.init({appId:"1500240286681345",cookie:!0,xfbml:!0,version:"v2.10"}),FB.AppEvents.logPageView()},function(e,t,i){var n,o=e.getElementsByTagName(t)[0];e.getElementById(i)||((n=e.createElement(t)).id=i,n.src="//connect.facebook.net/bg_BG/sdk.js",o.parentNode.insertBefore(n,o))}(document,"script","facebook-jssdk"),$("body").on("click",".facebook-dentacare-btn",function(e){var t={scope:"email"};e&&(t.auth_type="rerequest"),FB.login(function(e){if(e.authResponse){var t=e.authResponse.accessToken;$(".response-layer").show(),setTimeout(function(){FB.api("/me?fields=id,email,name,permissions",function(e){var i,n=e.id;if(null==e.email)return basic.showAlert("Please go to your facebook account privacy settings and make your email public. Without giving us access to your email we cannot proceed with the login.","",!0),$(".response-layer").hide(),!0;i=e.email,$.ajax({type:"POST",url:"/social-authenticate-dentacare-user",dataType:"json",data:{email:i,user_id:n,token:t},headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},success:function(e){successfulUserLogin(e)}})})},1e3)}},t)}),$("body").on("click",".google-dentacare-btn",function(){if(""==basic.cookies.get("social-allowed"))return basic.showAlert("Coming soon.","",!0),!1}),$("form#dentacare-sign-in").on("submit",function(e){e.preventDefault();var t=$(this);t.find(".error-handle").remove();for(var i=t.find(".form-field"),n=!0,o=0,s=i.length;o<s;o+=1)""==i.eq(o).val().trim()?(customErrorHandle(i.eq(o).closest(".field-parent"),"This field is required."),n=!1):"email"!=i.eq(o).attr("name")||basic.validateEmail(i.eq(o).val().trim())||(customErrorHandle(i.eq(o).closest(".field-parent"),"Please use valid email address."),n=!1);n&&($(".response-layer").show(),setTimeout(function(){$.ajax({type:"POST",url:"/authenticate-dentacare-user",dataType:"json",data:{email:t.find('input[name="email"]').val().trim(),password:t.find('input[name="password"]').val().trim()},success:function(e){successfulUserLogin(e)}})},1e3))})),$("body").hasClass("logged-in")){var add_overflow_hidden_on_hidden_box_show=!1,sm_screen_width=!1;$("body").addClass("overflow-hidden"),$(window).width()<992&&(add_overflow_hidden_on_hidden_box_show=!0,$(window).width()>767&&(sm_screen_width=!0)),$("body").removeClass("overflow-hidden"),sm_screen_width&&$(document).on("click","body",function(){$(".hidden-box-parent").find(event.target).length||($(".logged-user-right-nav .hidden-box").removeClass("show-this"),$(".logged-user-right-nav .up-arrow").removeClass("show-this"))}),add_overflow_hidden_on_hidden_box_show?$(".logged-user-right-nav .user-name, .logged-user-right-nav .header-avatar").click(function(){$(".logged-user-right-nav .hidden-box").toggleClass("show-this"),sm_screen_width?$(".logged-user-right-nav .up-arrow").toggleClass("show-this"):$("body").toggleClass("overflow-hidden")}):$(".logged-user-right-nav > .hidden-box-parent").hover(function(){$(".logged-user-right-nav .hidden-box").addClass("show-this"),$(".logged-user-right-nav .up-arrow").addClass("show-this")},function(){$(".logged-user-right-nav .hidden-box").removeClass("show-this"),$(".logged-user-right-nav .up-arrow").removeClass("show-this")}),$(".logged-user-right-nav .close-btn a").click(function(){$(".logged-user-right-nav .hidden-box").removeClass("show-this"),add_overflow_hidden_on_hidden_box_show&&($("body").removeClass("overflow-hidden"),sm_screen_width&&$(".logged-user-right-nav .up-arrow").removeClass("show-this"))})}function fixButtonsFocus(){$(document).on("click",".light-blue-white-btn",function(){$(this).blur()}),$(document).on("click",".white-light-blue-btn",function(){$(this).blur()})}function hidePopupOnBackdropClick(){$(document).on("click",".bootbox",function(){var e=event.target.className;(e=e.replace(/ /g,"."))&&!$("."+e).parents(".modal-dialog").length&&($(".bootbox.login-signin-popup").length&&$(".hidden-login-form").html(hidden_popup_content),$(".bootbox.login-signin-popup").length&&$(".hidden-login-form").html(hidden_popup_content),bootbox.hideAll())})}fixButtonsFocus(),hidePopupOnBackdropClick();var hidden_popup_content=$(".hidden-login-form").html();function bindLoginSigninPopupShow(){$(document).on("click",".show-login-signin",function(){openLoginSigninPopup()})}function openLoginSigninPopup(){return basic.closeDialog(),$(".hidden-login-form").html(""),basic.showDialog(hidden_popup_content,"login-signin-popup",null,!0),$(".login-signin-popup .dentist .form-register .address-suggester").removeClass("dont-init"),initAddressSuggesters(),$(".login-signin-popup .popup-header-action a").click(function(){$(".login-signin-popup .popup-body > .inline-block").addClass("custom-hide"),$(".login-signin-popup .popup-body ."+$(this).attr("data-type")).removeClass("custom-hide")}),$(".login-signin-popup .call-sign-up").click(function(){$(".login-signin-popup .form-login").hide(),$(".login-signin-popup .form-register").show()}),$(".login-signin-popup .call-log-in").click(function(){$(".login-signin-popup .form-login").show(),$(".login-signin-popup .form-register").hide()}),$(".login-signin-popup .patient .form-register #privacy-policy-registration-patient").on("change",function(){$(this).is(":checked")?($(".login-signin-popup .patient .form-register .facebook-custom-btn").removeAttr("custom-stopper"),$(".login-signin-popup .patient .form-register .civic-custom-btn").removeAttr("custom-stopper")):($(".login-signin-popup .patient .form-register .facebook-custom-btn").attr("custom-stopper","true"),$(".login-signin-popup .patient .form-register .civic-custom-btn").attr("custom-stopper","true"))}),$(document).on("civicCustomBtnClicked",function(e){$(".login-signin-popup .patient .form-register .step-errors-holder").html("")}),$(document).on("civicRead",async function(e){$(".response-layer").show()}),$(document).on("receivedFacebookToken",async function(e){$(".response-layer").show()}),$(document).on("facebookCustomBtnClicked",function(e){$(".login-signin-popup .patient .form-register .step-errors-holder").html("")}),$(document).on("customCivicFbStopperTriggered",function(e){customErrorHandle($(".login-signin-popup .patient .form-register .step-errors-holder"),"Please agree with our privacy policy.")}),$(".login-signin-popup form#dentist-login").on("submit",async function(e){var t=$(this);e.preventDefault(),$(".login-signin-popup form#dentist-login .error-handle").length&&$(".login-signin-popup form#dentist-login .error-handle").remove();for(var i=t.find(".form-field"),n=!0,o=0,s=i.length;o<s;o+=1)"email"!=i.eq(o).attr("type")||basic.validateEmail(i.eq(o).val().trim())?"password"==i.eq(o).attr("type")&&i.eq(o).val().length<6&&(customErrorHandle(i.eq(o).closest(".field-parent"),"Passwords must be min length 6."),n=!1):(customErrorHandle(i.eq(o).closest(".field-parent"),"Please use valid email address."),n=!1),""==i.eq(o).val().trim()&&(customErrorHandle(i.eq(o).closest(".field-parent"),"This field is required."),n=!1);var a=await $.ajax({type:"POST",url:"/check-dentist-account",dataType:"json",data:{email:$('.login-signin-popup form#dentist-login input[name="email"]').val().trim(),password:$('.login-signin-popup form#dentist-login input[name="password"]').val().trim()},headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")}});n&&(a.success?(fireGoogleAnalyticsEvent("DentistLogin","Click","Dentist Login"),this.submit()):a.error&&customErrorHandle(t.find('input[name="password"]').closest(".field-parent"),a.message))}),$(".login-signin-popup .dentist .form-register .prev-step").click(function(){var e=$(".login-signin-popup .dentist .form-register .step.visible"),t=e.prev();e.removeClass("visible"),t.hasClass("first")&&$(this).hide(),t.addClass("visible"),$(".login-signin-popup .dentist .form-register .next-step").val("Next"),$(".login-signin-popup .dentist .form-register .next-step").attr("data-current-step",t.attr("data-step"))}),$(".login-signin-popup .step.second .user-type-container .user-type").click(function(){$(".login-signin-popup .step.second .user-type-container .user-type").removeClass("active"),$(this).addClass("active"),$('.login-signin-popup .step.second .user-type-container [name="user-type"]').val($(this).attr("data-type"))}),$(".login-signin-popup #dentist-country").on("change",function(){$(".login-signin-popup .step.third .phone .country-code").html("+"+$(this).find("option:selected").attr("data-code"))}),styleAvatarUploadButton(".bootbox.login-signin-popup .dentist .form-register .step.fourth .avatar .btn-wrapper label"),initCaptchaRefreshEvent(),$(".login-signin-popup .dentist .form-register .next-step").click(async function(){var e=$(this);switch(e.attr("data-current-step")){case"first":var t=$(".login-signin-popup .dentist .form-register .step.first .form-field"),i=!1;$(".login-signin-popup .dentist .form-register .step.first").parent().find(".error-handle").remove();for(var n=0,o=t.length;n<o;n+=1){if("email"!=t.eq(n).attr("type")||basic.validateEmail(t.eq(n).val().trim())){if("email"==t.eq(n).attr("type")&&basic.validateEmail(t.eq(n).val().trim())){(await checkIfFreeEmail(t.eq(n).val().trim())).error&&(customErrorHandle(t.eq(n).closest(".field-parent"),"The email has already been taken."),i=!0)}}else customErrorHandle(t.eq(n).closest(".field-parent"),"Please use valid email address."),i=!0;"password"==t.eq(n).attr("type")&&t.eq(n).val().length<6&&(customErrorHandle(t.eq(n).closest(".field-parent"),"Passwords must be min length 6."),i=!0),""==t.eq(n).val().trim()&&(customErrorHandle(t.eq(n).closest(".field-parent"),"This field is required."),i=!0)}$(".login-signin-popup .dentist .form-register .step.first .form-field.password").val().trim()!=$(".login-signin-popup .step.first .form-field.repeat-password").val().trim()&&(customErrorHandle($(".login-signin-popup .step.first .form-field.repeat-password").closest(".field-parent"),"Both passwords don't match."),i=!0),i||(fireGoogleAnalyticsEvent("DentistRegistration","ClickNext","DentistRegistrationStep1"),$(".login-signin-popup .dentist .form-register .step").removeClass("visible"),$(".login-signin-popup .dentist .form-register .step.second").addClass("visible"),$(".login-signin-popup .prev-step").show(),e.attr("data-current-step","second"),e.val("Next"));break;case"second":var s=$(".login-signin-popup .dentist .form-register .step.second .form-field.required");i=!1;$(".login-signin-popup .dentist .form-register .step.second").find(".error-handle").remove();for(n=0,o=s.length;n<o;n+=1)s.eq(n).is("select")?""==s.eq(n).val().trim()&&(customErrorHandle(s.eq(n).closest(".field-parent"),"This field is required."),i=!0):s.eq(n).is("input")&&""==s.eq(n).val().trim()&&(customErrorHandle(s.eq(n).closest(".field-parent"),"This field is required."),i=!0);/^[a-z A-Z]+$/.test($('.login-signin-popup .dentist .form-register .step.second input[name="latin-name"]').val().trim())||(customErrorHandle($('.login-signin-popup .dentist .form-register .step.second input[name="latin-name"]').closest(".field-parent"),"This field should contain only latin characters."),i=!0),$(".login-signin-popup .dentist .form-register .step.second #privacy-policy-registration").is(":checked")||(customErrorHandle($(".login-signin-popup .dentist .form-register .step.second .privacy-policy-row"),'Please agree with our <a href="//dentacoin.com/privacy-policy" target="_blank">Privacy policy</a>.'),i=!0),i||(fireGoogleAnalyticsEvent("DentistRegistration","ClickNext","DentistRegistrationStep2"),$(".login-signin-popup .dentist .form-register .step").removeClass("visible"),$(".login-signin-popup .dentist .form-register .step.third").addClass("visible"),e.attr("data-current-step","third"),e.val("Next"));break;case"third":var a=$(".login-signin-popup .dentist .form-register .step.third .form-field.required");i=!1;$(".login-signin-popup .dentist .form-register .step.third").find(".error-handle").remove();for(n=0,o=a.length;n<o;n+=1)a.eq(n).is("select")?""==a.eq(n).val().trim()&&(customErrorHandle(a.eq(n).closest(".field-parent"),"This field is required."),i=!0):a.eq(n).is("input")&&(""==a.eq(n).val().trim()&&(customErrorHandle(a.eq(n).closest(".field-parent"),"This field is required."),i=!0),"url"!=a.eq(n).attr("type")||basic.validateUrl(a.eq(n).val().trim())?"number"!=a.eq(n).attr("type")||basic.validatePhone(a.eq(n).val().trim())||(customErrorHandle(a.eq(n).closest(".field-parent"),"Please use valid numbers."),i=!0):(customErrorHandle(a.eq(n).closest(".field-parent"),"Please enter your website URL starting with http:// or https://."),i=!0));var r=await validatePhone($('.login-signin-popup .dentist .form-register .step.third input[name="phone"]').val().trim(),$('.login-signin-popup .dentist .form-register .step.third select[name="country-code"]').val());has(r,"success")&&!r.success&&(customErrorHandle($('.login-signin-popup .dentist .form-register .step.third input[name="phone"]').closest(".field-parent"),"Please use valid phone."),i=!0),i||(fireGoogleAnalyticsEvent("DentistRegistration","ClickNext","DentistRegistrationStep3"),$(".login-signin-popup .dentist .form-register .step").removeClass("visible"),$(".login-signin-popup .dentist .form-register .step.fourth").addClass("visible"),e.attr("data-current-step","fourth"),e.val("Create account"));break;case"fourth":$(".login-signin-popup .dentist .form-register .step.fourth").find(".error-handle").remove();i=!1;if(""==$(".dentist .form-register .step.fourth #custom-upload-avatar").val().trim()&&(customErrorHandle($(".step.fourth .step-errors-holder"),"Please select avatar."),i=!0),null==$('.login-signin-popup .dentist .form-register .step.fourth [name="specializations[]"]:checked').val()&&(customErrorHandle($(".login-signin-popup .step.fourth .step-errors-holder"),"Please select specialization/s."),i=!0),$(".login-signin-popup .dentist .form-register .step.fourth .captcha-parent").length&&$(".login-signin-popup .dentist .form-register .step.fourth #register-captcha").length)(await checkCaptcha($(".login-signin-popup .dentist .form-register .step.fourth #register-captcha").val().trim())).error&&(customErrorHandle($(".login-signin-popup .step.fourth .step-errors-holder"),"Please enter correct captcha."),i=!0);else i=!0,window.location.reload();i||(fireGoogleAnalyticsEvent("DentistRegistration","ClickNext","DentistRegistrationComplete"),$(".response-layer").show(),$(".login-signin-popup form#dentist-register").submit())}}),!1}function customErrorHandle(e,t){e.append('<div class="error-handle">'+t+"</div>")}function onEnrichProfileFormSubmit(){$(document).on("submit",".enrich-profile-container #enrich-profile",function(e){var t=!1,i=$(this);i.find(".error-handle").remove(),""==i.find('[name="description"]').val().trim()&&(t=!0,customErrorHandle(i.find('[name="description"]').parent(),"Please enter short description.")),t?e.preventDefault():"dentist"==$(".enrich-profile-container").attr("data-type")?fireGoogleAnalyticsEvent("DentistRegistration","ClickSave","DentistDescr"):"clinic"==$(".enrich-profile-container").attr("data-type")&&fireGoogleAnalyticsEvent("DentistRegistration","ClickSave","ClinicDescr")})}function styleAvatarUploadButton(e){jQuery(".upload-file.avatar").length&&jQuery(".upload-file.avatar").each(function(t,i){var n=jQuery(this);n.attr("data-current-user-avatar")?n.find(".btn-wrapper").append('<label for="custom-upload-avatar" role="button" style="background-image:url('+n.attr("data-current-user-avatar")+');"><div class="inner"><i class="fa fa-plus fs-0" aria-hidden="true"></i><div class="inner-label fs-0">Add profile photo</div></div></label>'):n.find(".btn-wrapper").append('<label for="custom-upload-avatar" role="button"><div class="inner"><i class="fa fa-plus" aria-hidden="true"></i><div class="inner-label">Add profile photo</div></div></label>');var o=document.querySelectorAll(".inputfile");Array.prototype.forEach.call(o,function(t){t.nextElementSibling.innerHTML;t.addEventListener("change",function(t){readURL(this,e);this.files&&this.files.length>1?(this.getAttribute("data-multiple-caption")||"").replace("{count}",this.files.length):t.target.value.split("\\").pop()}),t.addEventListener("focus",function(){t.classList.add("has-focus")}),t.addEventListener("blur",function(){t.classList.remove("has-focus")})})})}function readURL(e,t){if(e.files&&e.files[0]){var i=new FileReader;i.onload=function(e){$(t).css({"background-image":'url("'+e.target.result+'")'}),$(t).find(".inner i").addClass("fs-0"),$(t).find(".inner .inner-label").addClass("fs-0")},i.readAsDataURL(e.files[0])}}async function checkIfFreeEmail(e){return await $.ajax({type:"POST",url:"/check-email",dataType:"json",data:{email:e},headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")}})}async function checkCaptcha(e){return await $.ajax({type:"POST",url:"/check-captcha",dataType:"json",data:{captcha:e},headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")}})}async function validatePhone(e,t){return await $.ajax({type:"POST",url:"https://api.dentacoin.com/api/phone/",dataType:"json",data:{phone:e,country_code:t}})}function apiEventsListeners(){$(document).on("successResponseCoreDBApi",async function(e){if(e.response_data.token){var t={token:e.response_data.token,id:e.response_data.data.id,_token:$('meta[name="csrf-token"]').attr("content")};$('input[type="hidden"][name="route"]').length&&$('input[type="hidden"][name="slug"]').length&&(t.route=$('input[type="hidden"][name="route"]').val(),t.slug=$('input[type="hidden"][name="slug"]').val()),null!=basic.objHasKey(t,"address")&&innerAddressCheck(t.address),e.response_data.new_account?"facebook"==e.platform_type?fireGoogleAnalyticsEvent("PatientRegistration","ClickFB","Patient Registration FB"):"civic"==e.platform_type&&fireGoogleAnalyticsEvent("PatientRegistration","ClickNext","Patient Registration Civic"):"facebook"==e.platform_type?fireGoogleAnalyticsEvent("PatientLogin","Click","Login FB"):"civic"==e.platform_type&&fireGoogleAnalyticsEvent("PatientLogin","Click","Login Civic"),customJavascriptForm("/patient-login",t,"post")}}),$(document).on("errorResponseCoreDBApi",function(e){var t="";if(e.response_data.errors)for(var i in e.response_data.errors)t+=e.response_data.errors[i]+"<br>";$(".response-layer").hide(),basic.showAlert(t,"",!0)})}function customJavascriptForm(e,t,i){i=i||"post";var n=document.createElement("form");for(var o in n.setAttribute("method",i),n.setAttribute("action",e),t)if(t.hasOwnProperty(o)){var s=document.createElement("input");s.setAttribute("type","hidden"),s.setAttribute("name",o),s.setAttribute("value",t[o]),n.appendChild(s)}document.body.appendChild(n),n.submit()}function bindGoogleAlikeButtonsEvents(){$("body").on("click",".custom-google-label-style label",function(){$(this).addClass("active-label"),"true"==$(".custom-google-label-style").attr("data-input-blue-green-border")&&$(this).parent().find("input").addClass("blue-green-border")}),$("body").on("keyup change focusout",".custom-google-label-style input",function(){$(this).val().trim().length?($(this).closest(".custom-google-label-style").find("label").addClass("active-label"),"true"==$(this).closest(".custom-google-label-style").attr("data-input-blue-green-border")&&$(this).addClass("blue-green-border")):($(this).closest(".custom-google-label-style").find("label").removeClass("active-label"),"true"==$(this).closest(".custom-google-label-style").attr("data-input-blue-green-border")&&$(this).removeClass("blue-green-border"))})}function has(e,t){return!!e&&hasOwnProperty.call(e,t)}function fireGoogleAnalyticsEvent(e,t,i,n){null!=n&&({event_action:t,event_category:e,event_label:i}.value=n)}bindLoginSigninPopupShow(),onEnrichProfileFormSubmit(),apiEventsListeners(),bindGoogleAlikeButtonsEvents();