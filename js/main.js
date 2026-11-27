(function () {
    "use strict";

    // Fallback spinner hide in case jQuery CDN is unavailable offline
    window.addEventListener("DOMContentLoaded", function () {
        var spinnerEl = document.getElementById("spinner");
        if (spinnerEl) {
            setTimeout(function () {
                spinnerEl.classList.remove("show");
            }, 50);
        }

        // Appointment & Contact Form Submission -> Show Thank You Message
        var forms = document.querySelectorAll(".appointment-form, .contact-form");
        forms.forEach(function (form) {
            form.addEventListener("submit", function (e) {
                e.preventDefault();
                if (!form.checkValidity()) {
                    form.reportValidity();
                    return;
                }
                var thankYouEl = form.querySelector(".thank-you-message");
                if (thankYouEl) {
                    thankYouEl.classList.remove("d-none");
                    thankYouEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }
                form.reset();
            });
        });

        // Footer Newsletter SignUp confirmation
        var newsletterBtns = document.querySelectorAll(".newsletter-btn");
        newsletterBtns.forEach(function (btn) {
            btn.addEventListener("click", function () {
                var wrapper = btn.closest(".col-lg-3");
                if (!wrapper) return;
                var input = wrapper.querySelector("input");
                var msg = wrapper.querySelector(".newsletter-thank-you");
                if (input && input.value.trim() !== "") {
                    input.value = "";
                    if (msg) {
                        msg.textContent = "Thank you for subscribing to our updates!";
                        msg.classList.remove("d-none", "text-warning");
                        msg.classList.add("text-success");
                    }
                } else if (msg) {
                    msg.textContent = "Please enter your email address first.";
                    msg.classList.remove("d-none", "text-success");
                    msg.classList.add("text-warning");
                }
            });
        });
    });

    // jQuery-dependent template features (runs cleanly when jQuery is loaded)
    if (typeof window.jQuery !== "undefined") {
        (function ($) {
            // Spinner
            var spinner = function () {
                setTimeout(function () {
                    if ($('#spinner').length > 0) {
                        $('#spinner').removeClass('show');
                    }
                }, 1);
            };
            spinner();

            // Initiate the wowjs
            if (typeof WOW !== "undefined") {
                new WOW().init();
            }

            // Sticky Navbar
            $(window).scroll(function () {
                if ($(this).scrollTop() > 300) {
                    $('.sticky-top').addClass('shadow-sm').css('top', '0px');
                } else {
                    $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
                }
            });

            // Back to top button
            $(window).scroll(function () {
                if ($(this).scrollTop() > 300) {
                    $('.back-to-top').fadeIn('slow');
                } else {
                    $('.back-to-top').fadeOut('slow');
                }
            });
            $('.back-to-top').click(function () {
                $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
                return false;
            });

            // Testimonials carousel
            if ($.fn.owlCarousel) {
                $(".testimonial-carousel").owlCarousel({
                    autoplay: true,
                    smartSpeed: 1000,
                    items: 1,
                    dots: false,
                    loop: true,
                    nav: true,
                    navText: [
                        '<i class="bi bi-chevron-left"></i>',
                        '<i class="bi bi-chevron-right"></i>'
                    ]
                });
            }
        })(window.jQuery);
    }
})();
