function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    function Validate(inputElement, rule) {
        var errorElement = getParent(
            inputElement,
            options.formGroupSelector
        ).querySelector(options.errorSelector);
        // var errorElement = inputElement.parentElement.querySelector(
        //     options.errorSelector
        // );
        var errorMessage = rule.test(inputElement.value);

        // Lấy ra các rule của selector
        var rules = selectorRules[rule.selector];
        // errorMessage = rules[i](inputElement.value);

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            // console.log(errorElement)
            getParent(inputElement, options.formGroupSelector).classList.add(
                "invalid"
            );
        } else {
            errorElement.innerText = "";
            getParent(inputElement, options.formGroupSelector).classList.remove(
                "invalid"
            );
        }

        return !errorMessage;
    }

    var formElement = document.querySelector(options.form);
    if (formElement) {
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;

            // Lặp qua từng rules và validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = Validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                if (typeof options.onSubmit === "function") {
                    // var enableInputs = formElement.querySelectorAll(
                    //     "[name]:not([disabled])"
                    // );
                    // var formValues = Array.from(enableInputs).reduce(function (
                    //     values,
                    //     input
                    // ) {
                    //     switch (input.type) {
                    //         case "radio":
                    //             values[input.name] = formElement.querySelector(
                    //                 'input[name="' + input.name + '"]:checked'
                    //             ).value;
                    //             break;
                                
                    //         case "checkbox":
                    //             if(input.matches(':checked')) {
                    //                 values[input.name] = '';
                    //                 return values;
                    //             }
                    //             if(!Array.isArray(values[input.name])) {
                    //                 values[input.name] = [];
                    //             }
                    //             values[input.name].push()
                    //             break;
                    //             case 'file':
                    //                 values[input.name] = input.flies;
                    //         default:
                    //             values[input.name] = input.value;
                    //     }

                    //     return values;
                    // },
                    // {});
                    // options.onSubmit(formValues);
                    formElement.submit();
                }
            }
        };

        // Lặp qua mỗi rule & xử lý
        options.rules.forEach(function (rule) {
            // Lưu lại các rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }
            

            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function (inputElement) {
                // Xử lý khi đang ký
                var errorElement =
                    inputElement.parentElement.querySelector(
                        ".error-message-box"
                    );
                inputElement.oninput = function () {
                    getParent(
                        inputElement,
                        options.formGroupSelector
                    ).classList.remove("invalid");
                };

                // Xử lý blur ra ngoài
                inputElement.onblur = function () {
                    Validate(inputElement, rule);
                };
            });
        });
    }
}

Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            // radio, checkbox, etc.
            if (value === null) {
                return value
                    ? undefined
                    : message || "Please enter this field!";
            }
            // text, password
            else {
                return value
                    ? undefined
                    : message || "Please enter this field!";
            }
        },
    };
};

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : "Wrong email format!";
        },
    };
};

Validator.isUsername = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^[a-zA-Z0-9]{1,20}$/;
            return regex.test(value) ? undefined : message || "Wrong username format!";
        },
    };
};

Validator.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min
                ? undefined
                : `Password must be ${min} characters long!`;
        },
    };
};

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue()
                ? undefined
                : message || "Confirm password does not match!";
        },
    };
};
