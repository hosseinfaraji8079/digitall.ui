import * as api from "./main.js";

$(document).ready(async function () {
    await api.showLoading();

    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const params = new URLSearchParams(url.search);
    const id = params.get("id");

    //get user information data
    // if api have bug show bog and go users page
    // fixed block or not block user
    await api.getDigitallApi(`/User/GetUser/${id}`).then(({ data }) => {
        // todo : check is success and status code
        $(`#user_information > div.card-body #user-id`).html(
            "ایدی کاربر : " + data.id || "ثبت نشده"
        );
        $(`#user_information > div.card-body #email-id`).html(
            "ایمیل: " + (data.email ? "null" : "ثبت نشده")
        );
        $(`#user_information > div.card-body #first-name`).html(
            " نام کاربر  : " + data.firstName || "ثبت نشده"
        );
        $(`#user_information > div.card-body #create-date`).html(
            "   زمان شروع کاربر   : " + (api.gregorianToJalali(data.createDate ?? "-"))
        );
        $(`#user_information > div.card-body #modified-date`).html(
            "    زمان ویرایش کاربر  : " + (api.gregorianToJalali(data.modifiedDate ?? "-"))
        );
        $(`#user_information > div.card-body #chatId`).html(
            "  ایدی عددی کاربر  : " + data.chatId || "ثبت نشده"
        );
        $(`#user_information > div.card-body #cardToCardPayment`).html(
            "   نمایش شماره کارت  : " + (data.cardToCardPayment ? "فعال" : "غیر فعال")
        );
        $(`#user_information > div.card-body #is-agent`).html(
            "  عنوان : " + (data.isAgent ? "نماینده" : "کاربر عادی")
        );
    });


    await api.hiddenLoading();
});


const modal_form = $("#modal_form_edit");

$(async function () {
    await modal_form.validate({
        rules: {
            recipient_name1: {
                required: true,
                number: true,
                range: [1000, 1000000],
            },
            recipient_name2: {
                required: true,
                number: true,
                range: [100, 100000],
            },
        },
        messages: {
            recipient_name1: {
                required: "درصد نمایندگی نمیتواند خالی باشد",
                number: "درصد نمایندگی حتما باید عدد باشد",
                range: "درصد نمایندگی باید بین 0 و 75 باشد",
            },
            recipient_name2: {
                required: "درصد نمایندگی نمیتواند خالی باشد",
                number: "درصد نمایندگی حتما باید عدد باشد",
                range: "درصد نمایندگی باید بین 0 و 500 باشد",
            }
        },
        // submitHandler: async function (form, event) {
        //     event.preventDefault();


        //     let { statusCode, isSuccess, message } = await api.updateDigitallApi("/Agent/Update", obj)

        //         if (statusCode == 0 && isSuccess == true) {
        //             api.notificationMessage(api.successTitle, message, api.successTheme)
        //             window.location.href = "/index.html"
        //         } else {
        //             api.notificationMessage(api.errorTitle, message, api.errorTheme)
        //         }


        // },
        errorPlacement: function (error, element) {
            error.addClass("invalid-feedback");

            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            }
            else if (element.prop('type') === 'radio' && element.parent('.radio-inline').length) {
                error.insertAfter(element.parent().parent());
            }
            else if (element.prop('type') === 'checkbox' || element.prop('type') === 'radio') {
                error.appendTo(element.parent().parent());
            }
            else {
                error.insertAfter(element);
            }
        },
        highlight: function (element, errorClass) {
            if ($(element).prop('type') != 'checkbox' && $(element).prop('type') != 'radio') {
                $(element).addClass("is-invalid").removeClass("is-valid");
            }
        },
        unhighlight: function (element, errorClass) {

            if ($(element).prop('type') != 'checkbox' && $(element).prop('type') != 'radio') {
                $(element).addClass("is-valid").removeClass("is-invalid");
            }
        }
    });

});


