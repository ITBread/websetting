$(document).ready(function () {
    doGetConfig();
});

function doCreateCamInfo() {
    $("#mySelect ").get(0).selectedIndex = -1;
    $('#cam1-name').removeAttr("readonly");
    clearCamInfo();
}

function clearCamInfo() {
    var empty = "";
    $('#cam1-name').val(empty);
    $('#cam1-rec_cycle').val(empty);
    $('#cam1-rec_in_addr').val(empty);
    $('#cam1-rec_out_addr').val(empty);
    $('#cam1-play_in_addr').val(empty);
    $('#cam1-play_out_addr').val(empty);
}

function setCamInfo(cam) {
    try {
        $('#cam1-name').val(cam.name);
        $('#cam1-rec_cycle').val(cam.rec_cycle);
        $('#cam1-rec_in_addr').val(cam.rec_in_addr);
        $('#cam1-rec_out_addr').val(cam.rec_out_addr);
        $('#cam1-play_in_addr').val(cam.play_in_addr);
        $('#cam1-play_out_addr').val(cam.play_out_addr);
    } catch (e) {
        console.log(e);
    }
}

function doSaveCamInfo() {
    var camNew = getCamInfo();
    if (camNew == undefined || camNew.name == undefined || camNew.name.length < 1) {
        alert("摄像头信息不能为空");
        return;
    }
    if(doCheckCamError(camNew)){
        alert("摄像头信息不完整");
        return;
    }

    var cameras = [];
    var camerasStr = sessionStorage.getItem("cameras");
    if (camerasStr == undefined) {
        cameras.push(camNew);
        sessionStorage.setItem("cameras", JSON.stringify(cameras));
        initSelect(cameras);
        alert(camNew.name + "新增保存成功");
        return;
    } else {
        cameras = JSON.parse(camerasStr);  
    }

    var exist = false;
    var msg = "";
    for (var nu = 0; nu < cameras.length; nu++) {
        if (cameras[nu].name == camNew.name) {
            exist = true;
            cameras[nu] = camNew;
            msg = "更新成功";
            break;
        }
    }

    if (!exist) {
        cameras.push(camNew);
         msg = "新增保存成功";
    }
    sessionStorage.removeItem("cameras");
    sessionStorage.setItem("cameras", JSON.stringify(cameras));
    initSelect(cameras);
    alert(camNew.name + msg);


}

function doDeleteCamInfo() {
    $('#cam1-name').attr("readonly", "readonly");
    var camNew = getCamInfo();
    if (camNew == undefined || camNew.name == undefined ) {
        alert("被删摄像头名称不能为空");
        return;
    }

    var camerasStr = sessionStorage.getItem("cameras");
    if (camerasStr == undefined)
        return;
    var cameras = JSON.parse(camerasStr);
    if (cameras == undefined || cameras.length == 0)
        return;
    var exist = false;
    var newCameraList = [];
    for (var nu = 0; nu < cameras.length; nu++) {
        var cam = cameras[nu];
        if (cam.name != camNew.name) {
            newCameraList.push(cam);          
        } else {
            exist = true;
        }
    }
    if (exist) {
        sessionStorage.removeItem("cameras");
        sessionStorage.setItem("cameras", JSON.stringify(newCameraList));
        clearCamInfo();
        initSelect(newCameraList);
        alert("删除成功");
    } else {
        alert("已删除或者已删除");
    }
}


function changeCamIndex(value) {
    $('#cam1-name').attr("readonly", "readonly");
    var camerasStr = sessionStorage.getItem("cameras");
    if (camerasStr == undefined)
        return;
    var cameras = JSON.parse(camerasStr);
    if (cameras == undefined || cameras.length == 0)
        return;

    for (var nu = 0; nu < cameras.length; nu++) {
        var cam = cameras[nu];
        if (cam.name == value) {
            setCamInfo(cam);
            return;
        }
    }



}
//返回 true 参数不对
//检查参数合法与为空情况
function doCheck(inlink, wifi, cameras) {
    var result = false;
    if (doCheckIlinkError(inlink))
        return true;
    else if (doCheckWifiError(wifi))
        return true;

    if (cameras != undefined || cameras.length > 0) {
        for (var i = 0; i < cameras.length; i++) {
            if (doCheckCamError(cameras[i])) {
                return true;
            }
        }
    }

    return result;
}

function strIsNullOrEmpty(str) {
    if (str == undefined || str == null || str.length == 0)
        return true;
    return false;

}


function doCheckIlinkError(ilink) {
    var result = false;
    uid = ilink.uid;
    appkey = ilink.appkey;
    secrutykey = ilink.securtkey;
    reg = /^[0-9a-zA-Z]+$/;
    reg1 = /^[0-9a-z\-]+$/;
    reg2 = /^[0-9a-z]+$/;
    reg3 = /^[0-9]*$/;
    //var reg3 = new RegExp("^[0-9]*$");
    if (uid.length < 34) {
        alert("请输入34位UID!");
        return true;
    }
    if (!reg.test(uid)) {
        alert("UID只能输入字母和数字!");
        return true;
    }
    if (appkey.length < 20) {
        alert("请输入20位APPKEY!");
        return true;
    }
    if (!reg1.test(appkey)) {
        alert("APPKEY只能输入小写字母、‘-’、和数字!");
        return true;
    }
    if (secrutykey.length < 32) {
        layer.msg("请输入32位SECRETKEY!");
        return true;
    }
    if (!reg2.test(secrutykey)) {
        alert("SECRETKEY只能输入小写字母和数字!");
        return true;
    }
    if (!reg3.test(ilink.port)) {
        alert("端口只能输入数字!");
        return true;
    }
     if (strIsNullOrEmpty(ilink.server)){
        return true;
    }
    return result;
}

function doCheckWifiError(wifi) {
    var result = false;
    if (strIsNullOrEmpty(wifi.mode))
        return true;
    else if (strIsNullOrEmpty(wifi.ssid))
        return true;
    else if (strIsNullOrEmpty(wifi.passwd))
        return true;
    return result;
}

function doCheckCamError(cam) {

    var result = false;

     if (strIsNullOrEmpty(cam.name))
        return true;
     if (isNaN(cam.rec_cycle))
        return true;
     if (strIsNullOrEmpty(cam.rec_in_addr))
        return true;
     if (strIsNullOrEmpty(cam.rec_out_addr))
        return true;
     if (strIsNullOrEmpty(cam.play_in_addr))
        return true;
     if (strIsNullOrEmpty(cam.play_out_addr))
        return true;
    return result;
}


//重置数据由小波定义
function doReset() {
    $.ajax({
        type: "POST",
        url: "api/getConfig.ashx", //改成盒子的
        data: JSON.stringify({ reset: true }), //改成盒子的
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result.code == 1) {
                location.reload();
            }
            else {
                alert("重置失败");
            }

        },
        error: function (result) {
            console.log("error====" + JSON.stringify(result));
        }
    });
}


function doSubmit() {
    var dataJson = {};
    var ilink = {};
    var wifi = {};
    var cameras = [];
    var camListTemp = [];

    ilink.uid = $.trim($('#ilink-uid').val());
    ilink.appkey = $.trim($('#ilink-appkey').val());
    ilink.securtkey = $.trim($('#ilink-securtkey').val());
    ilink.server = $.trim($('#ilink-server').val());
    if (!isNaN($.trim($('#ilink-port').val())))
        ilink.port = parseInt($.trim($('#ilink-port').val()));
    dataJson.ilink = ilink;

    var camerasStr = sessionStorage.getItem("cameras");
    if (camerasStr != undefined) {
        cameras = JSON.parse(camerasStr);
        if (cameras != undefined && cameras.length > 0) {         
            for (var i = 0; i < length; i++) {
                var camTemp = cameras[i];
                if (camTemp != undefined && camTemp.name != undefined && camTemp.name.length > 0) {
                    camListTemp.push(camTemp);
                }
            }
            if (camListTemp.length > 0)
                dataJson.cameras = camListTemp;
        }

    }

    wifi.mode = $.trim($('#wifi-mode').val());
    wifi.ssid = $.trim($('#wifi-ssid').val());
    wifi.passwd = $.trim($('#wifi-passwd').val());
    dataJson.wifi = wifi;
    var url = "www.ilink.com";
    if (!doCheck(ilink, wifi, cameras))
        doSaveConfig(url, dataJson);
    else {
        alert("参数错误");
        
    }


}

function getCamInfo() {
    var datObj = {};
    try {
        datObj.name = $.trim($('#cam1-name').val());
        datObj.rec_cycle = parseInt($.trim($('#cam1-rec_cycle').val()));
        datObj.rec_in_addr = $.trim($('#cam1-rec_in_addr').val());
        datObj.rec_out_addr = $.trim($('#cam1-rec_out_addr').val());
        datObj.play_in_addr = $.trim($('#cam1-play_in_addr').val());
        datObj.play_out_addr = $.trim($('#cam1-play_out_addr').val());
    } catch (e) {
        console.log(e);
    }
    return datObj;
}

function doSaveConfig(url, jsondata) {
    if (jsondata == undefined || url == undefined) {
        console.log("doSave=====error=url=" + url + "= jsondata ====" + jsondata);
        return;
    }

    $.ajax({
        type: "POST",
        url: "api/getConfig.ashx",
        data: JSON.stringify(jsondata),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result.code == 1) {
                alert("保存成功");
            }
            else {
                alert("保存失败");
            }
            console.log("doSave result====" + JSON.stringify(result));

        },
        error: function (result) {
            console.log("error====" + JSON.stringify(result));
        }
    });
}

function doGetConfig() {
    var url = "api/getConfig.ashx";
    $.ajax({
        type: "GET",
        url: url,
        data: null,
        dataType: 'JSON',
        contentType: "application/json;charset=utf-8",
        crossDomain: true,
        success: function (data) {

            if (data == undefined)
                return;
            var wifi = data.wifi;
            var ilink = data.ilink;
            var cameras = data.cameras;
            var camListTemp = [];

            sessionStorage.removeItem("cameras");
            if (cameras != undefined && cameras.length > 0) {
                for (var i = 0; i < length; i++) {
                    var camTemp = cameras[i];
                    if (camTemp != undefined && camTemp.name != undefined && camTemp.name.length > 0) {
                        camListTemp.push(camTemp);
                    }
                }
                if (camListTemp.length>0)
                    sessionStorage.setItem("cameras", JSON.stringify(camListTemp));
            }

            initIlink(ilink);
            initWifi(wifi);
            initSelect(cameras);
        }
    });
}
//设置select
function initSelect(cameras) {
    $("#mySelect").empty();
    if (cameras != undefined || cameras.length > 0) {
        for (var i = 0; i < cameras.length; i++) {
            var cam = cameras[i];
            if (cam.name != undefined)
                $("#mySelect").append("<option value='" + cam.name + "'>" + cam.name + "</option>");
        }
        setCamInfo(cameras[0]);
    }
}

function initIlink(ilink) {
    if (ilink != undefined) {
        $('#ilink-uid').val(ilink.uid);
        $('#ilink-appkey').val(ilink.appkey);
        $('#ilink-securtkey').val(ilink.securtkey);
        $('#ilink-server').val(ilink.server);
        $('#ilink-port').val(ilink.port);
    }
}

function initWifi(wifi) {
    if (wifi != undefined) {
        $('#wifi-mode').val(wifi.mode);
        $('#wifi-ssid').val(wifi.ssid);
        $('#wifi-passwd').val(wifi.passwd);
    }
}

function initCamera(cameras) {
    if (cameras == undefined || cameras.length == 0)
        return;
    var cam = cameras[0];
    if (cam != undefined) {
        setCamInfo(cam);
    }
}
