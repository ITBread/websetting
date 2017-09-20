jQuery.fn.maxLength = function (max) {
    this.each(function () {
        var type = this.tagName.toLowerCase();
        var inputType = this.type ? this.type.toLowerCase() : null;
        if (type == "input" && inputType == "text" || inputType == "password") {
            //Apply the standard maxLength
            this.maxLength = max;
            this.onchange = function () {
                if (this.value.length > max) {
                    this.value = this.value.substring(0, max);
                    alert("长度不能超过" + max);
                }
            };
        }
        else if (type == "textarea") {
            this.onkeypress = function (e) {
                var ob = e || event;
                var keyCode = ob.keyCode;
                var hasSelection = document.selection ? document.selection.createRange().text.length > 0 : this.selectionStart != this.selectionEnd;
                if (this.value.length > max) {
                    alert("长度不能超过" + max);
                }
                return !(this.value.length >= max && (keyCode > 50 || keyCode == 32 || keyCode == 0 || keyCode == 13) && !ob.ctrlKey && !ob.altKey && !hasSelection);
            };
            this.onkeyup = function () {
                if (this.value.length > max) {
                    this.value = this.value.substring(0, max);
                    alert("长度不能超过"+max);
                }
            };
            this.onchange = function () {
                if (this.value.length > max) {
                    this.value = this.value.substring(0, max);
                    alert("长度不能超过" + max);
                }
            };
        }
    });
};

// ----------------------------------------------------------------------
// <summary>
// 限制只能输入数字
// </summary>
// ----------------------------------------------------------------------
$.fn.onlyNum = function () {
    $(this).keypress(function (event) {
        var eventObj = event || e;
        var keyCode = eventObj.keyCode || eventObj.which;
        if ((keyCode >= 48 && keyCode <= 57))
            return true;
        else {
            alert("只能输入数字");
            return false;
        }
    }).focus(function () {
        //禁用输入法
        this.style.imeMode = 'disabled';
    }).bind("paste", function () {
        //获取剪切板的内容
        var clipboard = window.clipboardData.getData("Text");
        if (/^\d+$/.test(clipboard))
            return true;
        else
            return false;
    });
};

// ----------------------------------------------------------------------
// <summary>
// 限制只能输入字母
// </summary>
// ----------------------------------------------------------------------
$.fn.onlyAlpha = function () {
    $(this).keypress(function (event) {
        var eventObj = event || e;
        var keyCode = eventObj.keyCode || eventObj.which;
        if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122))
            return true;
        else
            return false;
    }).focus(function () {
        this.style.imeMode = 'disabled';
    }).bind("paste", function () {
        var clipboard = window.clipboardData.getData("Text");
        if (/^[a-zA-Z]+$/.test(clipboard))
            return true;
        else
            return false;
    });
};

// ----------------------------------------------------------------------
// <summary>
// 限制只能输入数字和字母
// </summary>
// ----------------------------------------------------------------------
$.fn.onlyNumAlpha = function () {
    $(this).keypress(function (event) {
        var eventObj = event || e;
        var keyCode = eventObj.keyCode || eventObj.which;
        if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122))
            return true;
        else
            return false;
    }).focus(function () {
        this.style.imeMode = 'disabled';
    }).bind("paste", function () {
        var clipboard = window.clipboardData.getData("Text");
        if (/^(\d|[a-zA-Z])+$/.test(clipboard))
            return true;
        else
            return false;
    });
};


$(document).ready(function () {
    $("#cam1-rec_cycle").onlyNum();
    $("#ilink-port").onlyNum();
    $("#ilink-appkey").maxLength(20);
    $("#ilink-securtkey").maxLength(32); 
    $("#ilink-uid").maxLength(34);
    $("#wifi-ssid").maxLength(32);
    $("#wifi-passwd").maxLength(32);
});
