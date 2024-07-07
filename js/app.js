var currentBannerSlide = 0;
var interval;

$(document).ready(function() {

    // Open sidebar on clicking hamburger menu. Close on clicking close button, clicking outside of sidebar, or increasing window width. Navigation sidebar handler
    $(".hamburger-menu").click(function() {
        $(".navigation-sidebar").addClass("opened");
    });
    $(".close-btn").click(function() {
        $(".navigation-sidebar").removeClass("opened");
    });
    $(".overlay").click(function() {
        $(".navigation-sidebar").removeClass("opened");
    });
    $(window).resize(function() {
        if ($(window).width() >= 768) {
            $(".navigation-sidebar").removeClass("opened");
        }
    });

    // Auto change slides after 5s. Change slide and reset interval after manually change slides. Banner image handler
    changeBannerSlide();
    interval = setInterval(autoNextSlide, 5000);
    $(".controls .back-btn").click(function() {
        currentBannerSlide--;
        if (currentBannerSlide < 0) {
            currentBannerSlide = 3;
        }
        resetBannerInterval();
        changeBannerSlide();
    });
    $(".controls .slide-1").click(function() {
        currentBannerSlide = 0;
        resetBannerInterval();
        changeBannerSlide();
    });
    $(".controls .slide-2").click(function() {
        currentBannerSlide = 1;
        resetBannerInterval();
        changeBannerSlide();
    });
    $(".controls .slide-3").click(function() {
        currentBannerSlide = 2;
        resetBannerInterval();
        changeBannerSlide();
    });
    $(".controls .slide-4").click(function() {
        currentBannerSlide = 3;
        resetBannerInterval();
        changeBannerSlide();
    });
    $(".controls .next-btn").click(function() {
        currentBannerSlide = (currentBannerSlide + 1) % 4;
        resetBannerInterval();
        changeBannerSlide();
    });

    // Assign function on click for each product tag. Product cards handler
    $("#cone-mint-tag").click(function() {
        $("#cone .this").removeClass("this");
        $("#cone-mint").addClass("this");
        $("#cone-mint-tag").addClass("this");
    });
    $("#cone-lemon-tag").click(function() {
        $("#cone .this").removeClass("this");
        $("#cone-lemon").addClass("this");
        $("#cone-lemon-tag").addClass("this");
    });
    $("#cone-straw-tag").click(function() {
        $("#cone .this").removeClass("this");
        $("#cone-straw").addClass("this");
        $("#cone-straw-tag").addClass("this");
    });
    $("#cone-choco-tag").click(function() {
        $("#cone .this").removeClass("this");
        $("#cone-choco").addClass("this");
        $("#cone-choco-tag").addClass("this");
    });
    $("#cup-kiwi-tag").click(function() {
        $("#cup .this").removeClass("this");
        $("#cup-kiwi").addClass("this");
        $("#cup-kiwi-tag").addClass("this");
    });
    $("#cup-mango-tag").click(function() {
        $("#cup .this").removeClass("this");
        $("#cup-mango").addClass("this");
        $("#cup-mango-tag").addClass("this");
    });
    $("#cup-straw-tag").click(function() {
        $("#cup .this").removeClass("this");
        $("#cup-straw").addClass("this");
        $("#cup-straw-tag").addClass("this");
    });
    $("#cup-choco-tag").click(function() {
        $("#cup .this").removeClass("this");
        $("#cup-choco").addClass("this");
        $("#cup-choco-tag").addClass("this");
    });
    $("#pop-apple-tag").click(function() {
        $("#popsicle .this").removeClass("this");
        $("#pop-apple").addClass("this");
        $("#pop-apple-tag").addClass("this");
    });
    $("#pop-lemon-tag").click(function() {
        $("#popsicle .this").removeClass("this");
        $("#pop-lemon").addClass("this");
        $("#pop-lemon-tag").addClass("this");
    });
    $("#pop-straw-tag").click(function() {
        $("#popsicle .this").removeClass("this");
        $("#pop-straw").addClass("this");
        $("#pop-straw-tag").addClass("this");
    });
    $("#pop-choco-tag").click(function() {
        $("#popsicle .this").removeClass("this");
        $("#pop-choco").addClass("this");
        $("#pop-choco-tag").addClass("this");
    });

    // Form validation handler
    $("#register form").submit(registerFormValidation);
    $("#register form").on("reset", registerFormResetValidation);
    $("#order form").submit(orderFormValidation);
    $("#order form").on("reset", orderFormReset);

    // Different flavor for each type of ice cream. Order form product selection handler
    $("#order #type").change(function() {
        $("#order #product-img .cited-img").slideUp();
        $("#order #flavor").val(null);
        $("#order #flavor").parent().off("click");
        $("#order #flavor + .error-msg").html("");
        if ($(this).val() == "cone") {
            $("#order #flavor1").html("Mint");
            $("#order #flavor1").prop("value", "mint");
            $("#order #flavor2").html("Lemon");
            $("#order #flavor2").prop("value", "lemon");
        } else if ($(this).val() == "cup") {
            $("#order #flavor1").html("Kiwi");
            $("#order #flavor1").prop("value", "kiwi");
            $("#order #flavor2").html("Mango");
            $("#order #flavor2").prop("value", "mango");
        } else if ($(this).val() == "popsicle") {
            $("#order #flavor1").html("Apple");
            $("#order #flavor1").prop("value", "apple");
            $("#order #flavor2").html("Lemon");
            $("#order #flavor2").prop("value", "lemon");
        }
        $("#order #flavor").prop("disabled", false);
    });

    // Product image change when user selects type and flavor. Order form product selection handler
    $("#order #flavor").change(function() {
        type = $("#order #type").val();
        flavor = $(this).val();
        targetImg = $("#order #product-img #" + type + "-" + flavor);
        imgs = $("#order #product-img .cited-img");

        imgs.slideUp();
        targetImg.slideDown();
    });

    // Show delivery address textbox and same as delivery checkbox when selecting Delivery. Order form handler
    $("#order #rDelivery").click(function() {
        $("#order #delivery-address").parent().slideDown({
            start: function() {
                $(this).css('display','grid');
            }
        });
        $("#order #same-as-delivery").parent().slideDown({
            start: function() {
                $(this).css('display','grid');
            }
        });
    });

    // Hide delivery address textbox and same as delivery checkbox, also clear those fields when selecting Pickup. Order form handler
    $("#order #rPickup").click(function() {
        $("#order #delivery-address").parent().slideUp();
        $("#order #same-as-delivery").parent().slideUp();
        $("#order #delivery-address").val(null);
        $("#order #same-as-delivery input").prop("checked", false);
        $("#order #same-as-delivery + .error-msg").html("");
    });

    // Fill Billing address with Delivery address when click on same as delivery checkbox only if Delivery address is not empty. Order form handler
    $("#order #same-as-delivery input").click(function(e) {
        var sameAsDeliveryErrorMsg = $("#order #same-as-delivery + .error-msg");
        sameAsDeliveryErrorMsg.html("");
        if ($(this).prop("checked")) {
            if ($("#order #delivery-address").val() == "") {
                e.preventDefault();
                sameAsDeliveryErrorMsg.append("<p>Delivery address must be filled before choosing this option.</p>");
            } else {
                $("#order #billing-address").val($("#order #delivery-address").val());
            }
        }
    });

    // Show credit card type and credit card number when selecting Online payment. Order form handler
    $("#order #rOnline").click(function() {
        $("#order #credit-card-type").parent().slideDown({
            start: function() {
                $(this).css('display','grid');
            }
        });
        $("#order #credit-card-number").parent().slideDown({
            start: function() {
                $(this).css('display','grid');
            }
        });
    });

    // Hide credit card type and credit card number, also clear those fields when selecting On pickup payment. Order form handler
    $("#order #rOnpickup").click(function() {
        $("#order #credit-card-type").parent().slideUp();
        $("#order #credit-card-number").parent().slideUp();
        $("#order #rVisa").prop('checked', false);
        $("#order #rMastercard").prop('checked', false);
        $("#order #rAmericanExpress").prop('checked', false);
        $("#order #credit-card-type + .error-msg").html("");
        $("#order #credit-card-number").val(null);
        $("#order #credit-card-number + .error-msg").html("");
        $("#order #credit-card-number").prop("disabled", true);
        $("#order #credit-card-number").parent().click(function() {
            $(this).children(".error-msg").html("<p>You must fill in the above fields before filling this field.</p>");
        });
    });

    // Enable credit card number textbox when selecting one of the three credit card types. Order form handler
    $("#order #rVisa, #order #rMastercard, #order #rAmericanExpress").click(function() {
        $("#order #credit-card-number").prop("disabled", false);
        $("#order #credit-card-number").val(null);
        $("#order #credit-card-number").parent().off("click");
        $("#order #credit-card-number + .error-msg").html("");
    });

    // Display error message when trying to click on disabled fields. Order form handler
    $("#order #flavor, #order #credit-card-number").parent().click(function() {
        $(this).children(".error-msg").html("<p>You must fill in the above fields before filling this field.</p>");
    });
});

// Change banner slide to the current slide index as stored in currentBannerSlide variable
function changeBannerSlide() {
    var slides = $(".slide").toArray();
    var indicator = $(".indicator").toArray();
    for (var i = 0; i < slides.length; i++) {
        if (i === currentBannerSlide) {
            $(slides[i]).addClass("this");
            $(indicator[i]).addClass("this");
        } else {
            $(slides[i]).removeClass("this");
            $(indicator[i]).removeClass("this");
        }
    }
}

// Reset banner interval
function resetBannerInterval() {
    clearInterval(interval);
    interval = setInterval(autoNextSlide, 5000);
}

// Increase current banner slide index by one. Go back to 0 if index goes beyond 4. Then change banner slide.
function autoNextSlide() {
    currentBannerSlide = (currentBannerSlide + 1) % 4;
    changeBannerSlide();
}

// Register form validation
function registerFormValidation() {
    // Get all form fields' values
    var username = $("#register #username").val();
    var email = $("#register #email").val();
    var password = $("#register #password").val();
    var retypePassword = $("#register #retype-password").val();
    var fname = $("#register #fname").val();
    var lname = $("#register #lname").val();
    var age = $("#register #age").val();
    var male = $("#register #rMale").prop('checked');
    var female = $("#register #rFemale").prop('checked');
    var address = $("#register #address").val();
    var postcode = $("#register #postcode").val();
    var lang = $("#register #lang").val();
    var cup = $("#register #cbCup").prop('checked');
    var cone = $("#register #cbCone").prop('checked');
    var popsicle = $("#register #cbPopsicle").prop('checked');

    // Get all form error message elements
    var usernameErrorMsg = $("#register #username + .error-msg");
    var emailErrorMsg = $("#register #email + .error-msg");
    var passwordErrorMsg = $("#register #password + .error-msg");
    var retypePasswordErrorMsg = $("#register #retype-password + .error-msg");
    var fnameErrorMsg = $("#register #fname + .error-msg");
    var lnameErrorMsg = $("#register #lname + .error-msg");
    var ageErrorMsg = $("#register #age + .error-msg");
    var genderErrorMsg = $("#register #gender + .error-msg");
    var addressErrorMsg = $("#register #address + .error-msg");
    var postcodeErrorMsg = $("#register #postcode + .error-msg");
    var langErrorMsg = $("#register #lang + .error-msg");
    var favTypeErrorMsg = $("#register #fav-type + .error-msg");

    var result = true;

    // Clear all error messages
    registerFormResetValidation();

    // Check fields that must not be empty
    [[username, usernameErrorMsg], [fname, fnameErrorMsg], [lname, lnameErrorMsg], [age, ageErrorMsg], [address, addressErrorMsg]].forEach(([element, elementErrorMsg]) => {
        if (element === "") {
            elementErrorMsg.append("<p>This field must not be empty.</p>");
            result = false;
        }
    });

    // Check email not empty and follow specific rule
    if (email === "") {
        emailErrorMsg.append("<p>Email must not be empty.</p>");
        result = false;
    } else if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        emailErrorMsg.append("<p>Email address must be valid.</p>");
        result = false;
    }

    // Check password not empty and follow specific rule
    if (password === "") {
        passwordErrorMsg.append("<p>Password must not be empty.</p>");
        result = false;
    } else {
        if (password.length < 9) {
            passwordErrorMsg.append("<p>Password must be at least 9 characters.</p>");
            result = false;
        }
        if (!password.match(/[a-z]/)) {
            passwordErrorMsg.append("<p>Password must contain at least one lowercase character.</p>");
            result = false;
        }
        if (!password.match(/[A-Z]/)) {
            passwordErrorMsg.append("<p>Password must contain at least one uppercase character.</p>");
            result = false;
        }
        if (!password.match(/[0-9]/)) {
            passwordErrorMsg.append("<p>Password must contain at least one number.</p>");
            result = false;
        }
        if (!password.match(/[#?!@$%^&*-]/)) {
            passwordErrorMsg.append("<p>Password must contain at least one of the following special characters: # ? ! @ $ % ^ & * - </p>");
            result = false;
        }
    }

    // Check retype password not empty and same as password
    if (retypePassword === "") {
        retypePasswordErrorMsg.append("<p>Retype password must not be empty.</p>");
        result = false;
    } else if (retypePassword != password) {
        retypePasswordErrorMsg.append("<p>Retype password must be the same as the password.</p>");
        result = false;
    }

    // Check postcode not empty and is a 4-digit number
    if (postcode === "") {
        postcodeErrorMsg.append("<p>This field must not be empty.</p>");
        result = false;
    } else if (!postcode.match(/^\d{4}$/)) {
        postcodeErrorMsg.append("<p>Postcode must be a 4-digit number.</p>");
        result = false;
    }

    // Check select field not empty
    [[lang, langErrorMsg]].forEach(([element, elementErrorMsg]) => {
        if (element === null) {
            elementErrorMsg.append("<p>You must choose one option for this field.</p>");
            result = false;
        }
    });

    // Check radios and checkboxes not empty
    [[[male, female], genderErrorMsg], [[cup, cone, popsicle], favTypeErrorMsg]].forEach(([options, elementErrorMsg]) => {
        var isChoiceChecked = false;
        options.forEach((option) => {
            isChoiceChecked = isChoiceChecked || option;
        });
        if (!isChoiceChecked) {
            elementErrorMsg.append("<p>You must choose one option for this field.</p>");
            result = false;
        }
    });

    return result;
}

function registerFormResetValidation() {
    var usernameErrorMsg = $("#register #username + .error-msg");
    var emailErrorMsg = $("#register #email + .error-msg");
    var passwordErrorMsg = $("#register #password + .error-msg");
    var retypePasswordErrorMsg = $("#register #retype-password + .error-msg");
    var fnameErrorMsg = $("#register #fname + .error-msg");
    var lnameErrorMsg = $("#register #lname + .error-msg");
    var ageErrorMsg = $("#register #age + .error-msg");
    var genderErrorMsg = $("#register #gender + .error-msg");
    var addressErrorMsg = $("#register #address + .error-msg");
    var postcodeErrorMsg = $("#register #postcode + .error-msg");
    var langErrorMsg = $("#register #lang + .error-msg");
    var favTypeErrorMsg = $("#register #fav-type + .error-msg");

    // Clear all error messages elements
    [usernameErrorMsg, emailErrorMsg, passwordErrorMsg, retypePasswordErrorMsg, fnameErrorMsg, lnameErrorMsg, ageErrorMsg, genderErrorMsg, addressErrorMsg, postcodeErrorMsg, langErrorMsg, favTypeErrorMsg].forEach(element => {
        element.html("");
    });
}

function orderFormValidation() {
    // Select all form fields' values
    var type = $("#order #type").val();
    var flavor = $("#order #flavor").val();
    var delivery = $("#order #rDelivery").prop("checked");
    var pickup = $("#order #rPickup").prop("checked");
    var deliveryAddress = $("#order #delivery-address").val();
    var billingAddress = $("#order #billing-address").val();
    var contactNumber = $("#order #contact-number").val();
    var email = $("#order #email").val();
    var onpickup = $("#order #rOnpickup").prop("checked");
    var online = $("#order #rOnline").prop("checked");
    var visa = $("#order #rVisa").prop("checked");
    var mastercard = $("#order #rMastercard").prop("checked");
    var americanExpress = $("#order #rAmericanExpress").prop("checked");
    var ccNumber = $("#order #credit-card-number").val();

    // Get all form error message elements
    var typeErrorMsg = $("#order #type + .error-msg");
    var flavorErrorMsg = $("#order #flavor + .error-msg");
    var modeDeliveryErrorMsg = $("#order #mode-delivery + .error-msg");
    var deliveryAddressErrorMsg = $("#order #delivery-address + .error-msg");
    var billingAddressErrorMsg = $("#order #billing-address + .error-msg");
    var contactNumberErrorMsg = $("#order #contact-number + .error-msg");
    var emailErrorMsg = $("#order #email + .error-msg");
    var modePaymentErrorMsg = $("#order #mode-payment + .error-msg");
    var ccTypeErrorMsg = $("#order #credit-card-type + .error-msg");
    var ccNumberErrorMsg = $("#order #credit-card-number + .error-msg");

    var result = true;

    // Clear all error messages
    orderFormResetValidation();

    // Check product type is selected
    if (type === null) {
        typeErrorMsg.append("<p>You must choose one option for this field.</p>");
        result = false;
    } else if (flavor === null) {
        // Check flavor only if product type is selected
        flavorErrorMsg.append("<p>You must choose one option for this field.</p>");
        result = false;
    }

    // Check method of delivery is selected
    if (!delivery && !pickup) {
        modeDeliveryErrorMsg.append("<p>You must choose one option for this field.</p>");
        result = false;
    }

    // Check delivery address not empty only if delivery is selected
    if (delivery && deliveryAddress === "") {
        deliveryAddressErrorMsg.append("<p>This field must not be empty.</p>");
        result = false;
    }

    // Check billing address not empty
    if (billingAddress === "") {
        billingAddressErrorMsg.append("<p>This field must not be empty.</p>");
        result = false;
    }

    // Check contact number not empty and is number
    if (contactNumber === "") {
        contactNumberErrorMsg.append("<p>This field must not be empty.</p>");
        result = false;
    } else if (contactNumber.match(/\D/)) {
        contactNumberErrorMsg.append("<p>This field must only contain numbers.</p>");
        result = false;
    }

    // Check email not empty and follow specific rule
    if (email === "") {
        emailErrorMsg.append("<p>This field must not be empty.</p>");
        result = false;
    } else if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        emailErrorMsg.append("<p>Email address must be valid.</p>");
        result = false;
    }

    // Check mode of payment selected
    if (!onpickup && !online) {
        modePaymentErrorMsg.append("<p>You must choose one option for this field.</p>");
        result = false;
    }

    // check credit card type selected only if online payment selected
    if (online) {
        if (!visa && !mastercard && !americanExpress) {
            ccTypeErrorMsg.append("<p>You must choose one option for this field.</p>");
            result = false;
        } else {
            // check credit card number filled, is number and follow specific rule only if credit card type selected
            if (ccNumber === "") {
                ccNumberErrorMsg.append("<p>This field must not be empty.</p>");
                result = false;
            } else if (ccNumber.match(/\D/)) {
                ccNumberErrorMsg.append("<p>This field must only contain numbers.</p>");
                result = false;
            } else if ((visa || mastercard) && ccNumber.length != 16) {
                ccNumberErrorMsg.append("<p>Visa or MasterCard credit card number must exactly be 16 digits.</p>");
                result = false;
            } else if (americanExpress && ccNumber.length != 15) {
                ccNumberErrorMsg.append("<p>American Express credit card number must exactly be 15 digits.</p>");
                result = false;
            }
        }
    }

    return result;
}

function orderFormResetValidation() {
    var typeErrorMsg = $("#order #type + .error-msg");
    var flavorErrorMsg = $("#order #flavor + .error-msg");
    var modeDeliveryErrorMsg = $("#order #mode-delivery + .error-msg");
    var deliveryAddressErrorMsg = $("#order #delivery-address + .error-msg");
    var billingAddressErrorMsg = $("#order #billing-address + .error-msg");
    var sameAsDeliveryErrorMsg = $("#order #same-as-delivery + .error-msg");
    var contactNumberErrorMsg = $("#order #contact-number + .error-msg");
    var emailErrorMsg = $("#order #email + .error-msg");
    var modePaymentErrorMsg = $("#order #mode-payment + .error-msg");
    var ccTypeErrorMsg = $("#order #credit-card-type + .error-msg");
    var ccNumberErrorMsg = $("#order #credit-card-number + .error-msg");

    // Clear all error messages
    [typeErrorMsg, flavorErrorMsg, modeDeliveryErrorMsg, deliveryAddressErrorMsg, billingAddressErrorMsg, sameAsDeliveryErrorMsg, contactNumberErrorMsg, emailErrorMsg, modePaymentErrorMsg, ccTypeErrorMsg, ccNumberErrorMsg].forEach(element => {
        element.html("");
    });
}

function orderFormReset() {
    // Clear all error messages, hide and disable any elements that are hidden or disabled by default

    orderFormResetValidation();
    $("#order #credit-card-type").parent().slideUp();
    $("#order #credit-card-number").parent().slideUp();
    $("#order #delivery-address").parent().slideUp();
    $("#order #same-as-delivery").parent().slideUp();
    $("#order #product-img .cited-img").slideUp();
    $("#order #flavor").prop("disabled", true);
    $("#order #credit-card-number").prop("disabled", true);
    $("#order #flavor, #order #credit-card-number").parent().click(function() {
        $(this).children(".error-msg").html("<p>You must fill in the above fields before filling this field.</p>");
    });
}