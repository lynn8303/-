var formContext;
var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
var nextTchStaffName;
var nextTchNum;
var limiUnitCodlistArray;
var resource_org_id;
var ifHasControl;
var flow_finish_info;
var flowProcTable;
var tableObj;
var ifCheckLeave = false;
var urlParam;
var oForm = oForm;
var formContent, person, flow_mod, flow_name, flow_id, cur_staff_id, cur_tch_id, next_tchMod, next_tchName, is_Sms, form_id, is_resource_org, parent_flow_id, tch_mod;

var addSysFlag = false;
function onFormReady(oForm) {

    formContext = oForm;
    this.oForm = oForm;
    tch_num = formContext.FLOW.TCH_NUM;
    formContent = oForm;
    flow_mod = formContent.FLOW.FLOW_MOD;
    flow_id = formContent.FLOW.FLOW_ID;
    person = formContent.FLOW.TCH_RECEIVER;
    flow_name = formContent.FLOW.FLOW_NAME;
    cur_staff_id = formContent.GLOBAL_VAR.STAFF_ID;
    form_id = formContent.getFormId();
    cur_tch_id = formContent.FLOW.TCH_ID;
    tch_mod = formContent.FLOW.TCH_MOD;

    is_resource_org = getStaffInfo(cur_staff_id, "ORG_ID", 1) == 1;
    is_Sms = "1";

    this.oForm = oForm;
    this.formContext = oForm;
    getProc(oForm);

    if (oForm.FLOW.TCH_NUM == 'jtitsm_leave_02' ) {
        $('#leaveData').show().siblings("table").hide();
        $("#addSystemDiv").show();
    } else {
        if (oForm.FLOW.TCH_NUM == 'jtitsm_leave_01') {
            $("#flowFlogDiv").hide();
            $('#leaveData').show().siblings("table").hide();
        }
        $("#addSystemDiv").hide();

    }


    switch (oForm.FLOW.TCH_NUM) {
        case 'jtitsm_leave_01':
        case 'jtitsm_leave_02':
            initTable(1);
            break;
        case 'jtitsm_leave_03':
        case 'jtitsm_leave_05':
        case 'jtitsm_leave_06':
        case 'jtitsm_leave_07':
        case 'jtitsm_leave_08':
        case 'jtitsm_leave_sub_03':
            initTable2(4);
            break;
        case 'jtitsm_leave_04':
        case 'jtitsm_leave_sub_01':
            initTable2(2);
            break;
        case 'jtitsm_leave_sub_02':
            initTable2(3);
            break;
    }

    if (tch_num == 'jtitsm_leave_03') {//分部主任审批环节需要把涉及专业加载到层
        initView('INVOL_PROFESS', involProDic, 'INVOL_PROFESS-VIEW-CONTENT', 'true');
        <!-- 涉及转售商 -->
    }
}

function onFormSubmit(oForm) {
    return true;
}

function onClickBefore(oForm) {
	
    //环节提交前执行函数
    if (oForm.FLOW.TCH_NUM == 'jtitsm_leave_02') {
        if (addSysFlag) {
            EMsg("请添加涉及系统帐号信息!")
            return false;
        }
    }

    if (oForm.FLOW.TCH_NUM == 'jtitsm_leave_04' || oForm.FLOW.TCH_NUM == 'jtitsm_leave_sub_01') {
        var check = false;
        $("table input[id^=SYSTEM_ROOM_STAFF__]").each(function (index) {
            var val = $(this).val();
            if (val == '') {
                check = true;
                /*   $(this).focus();*/
                return false;
            }
        });
        if (check) {
            EMsg("请选择系统室处理人！");
            return false;
        }
        updOperatorRoomStaff();
    }

    if (oForm.FLOW.TCH_NUM == 'jtitsm_leave_sub_02') {
        var check = false;
        $("table input[id^=DEAL_EXPLAIN__]").each(function (index) {
            var val = $(this).val();
            if (val == '') {
                check = true;
                return false;
            }
        });
        if (check) {
            EMsg("请填写处理说明！");
            return false;
        }
        updOperatorDeal();
    }
    return true;
}

var xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
var comUrl = "../../../servlet/commonservlet?";
function choosePersonOther(oBlamePeopleId, oBlamePeopleName) {

    if (oForm.FLOW.TCH_NUM != 'jtitsm_leave_01') {
        return false;
    }
    var obj = choiceStaff(false, 104,'','','','','',true);
    if (obj != null) {
        oBlamePeopleId.value = obj.id;
        oBlamePeopleName.value = obj.name;
        xmlHttp.open("POST", comUrl + "tag=201&paramValue=" +
              getAESEncode(encodeURIComponent("select strcat(distinct b.org_name) org_names,strcat(distinct b.org_id) org_ids from staff a, organization b where a.org_id=b.org_id and a.staff_id in(" + obj.id + ")")), false);
        xmlHttp.send();
        var rsXml = xmlHttp.responseXML;
        LEAVE_ORG_NAME.value = rsXml.selectSingleNode("/root/rowSet/ORG_NAMES").text;
        LEAVE_ORG_ID.value = rsXml.selectSingleNode("/root/rowSet/ORG_IDS").text;
    }
}
function chooseStaffPerson(org_id,oBlamePeopleId, oBlamePeopleName) {
    var obj = choiceStaff(false, org_id,'','','','','',true);
    if (obj != null) {
        oBlamePeopleId.value = obj.id;
        oBlamePeopleName.value = obj.name;

    }
}

var servlet_url = "/leaveRecoveryAction.do?method=loadList";
var staffId = getCurrentUserInfo("staff_id");
function initTable(flag) {
//        tableFlag = flag;
    var tache_table, tache_color;

    tache_table = '4';
    tache_color = '0';

    var orderby = '';
    var sendXML = '<?xml version="1.0" encoding="utf-8"?>'
            + '<root>';
    sendXML += '<STAFF_ID>' + staffId + '</STAFF_ID>';
    sendXML += '<TAG>' + flag + '</TAG>';
    sendXML += '<FLOW_ID>' + flow_id + '</FLOW_ID>';
    sendXML += '<TACHE_TABLE>' + tache_table + '</TACHE_TABLE>';
    sendXML += '<TACHE_COLOR>' + tache_color + '</TACHE_COLOR>';
    sendXML += '<search pagesize="10" page="1" orderby="' + orderby + '"></search>';
    sendXML += '</root>';
    leaveData.dataUrl = servlet_url;
    leaveData.sendXML = sendXML;
    leaveData.isPage = 'T';
    leaveData.dbAction = '';
    leaveData.isOnClick = 'F';
    leaveData.normalColor = "#f3f3f3";
    leaveData.normalColor2 = "#ffffff";
    leaveData.pageSize = 10;
    leaveData.fontSize = "13px";
    leaveData.fontColor = "#364960";
    leaveData.tdBorder = "0px";
    leaveData.overColor = '#ffedc7';
    leaveData.height = "40px";

    leaveData.showRowIndex = "T";
    leaveData.thClass = "tHeadCss";

    if (oForm.FLOW.TCH_NUM == 'jtitsm_leave_01') {

        leaveData.isShowNoData = 'T';
    } else {
        leaveData.isShowNoData = 'F';
    }

    buildTable(leaveData);

}
function initTable2(flag) {

    var tache_table, tache_color;
    
    tache_table = '4';
    tache_color = '0';

    var orderby = '';
    var sendXML = '<?xml version="1.0" encoding="utf-8"?>'
            + '<root>';
    sendXML += '<STAFF_ID>' + staffId + '</STAFF_ID>';
    sendXML += '<TAG>' + flag + '</TAG>';
    sendXML += '<FLOW_ID>' + flow_id + '</FLOW_ID>';


    sendXML += '<TACHE_TABLE>' + tache_table + '</TACHE_TABLE>';
    sendXML += '<TACHE_COLOR>' + tache_color + '</TACHE_COLOR>';
    sendXML += '<search pagesize="10" page="1" orderby="' + orderby + '"></search>';
    sendXML += '</root>';
    leaveData2.dataUrl = servlet_url;
    leaveData2.sendXML = sendXML;
    leaveData2.isPage = 'T';
    leaveData2.dbAction = '';
    leaveData2.isOnClick = 'F';
    leaveData2.normalColor = "#f3f3f3";
    leaveData2.normalColor2 = "#ffffff";
    leaveData2.pageSize = 10;
    leaveData2.fontSize = "13px";
    leaveData2.fontColor = "#364960";
    leaveData2.tdBorder = "0px";
    leaveData2.overColor = '#ffedc7';
    leaveData2.height = "40px";

    leaveData2.showRowIndex = "T";
    leaveData2.thClass = "tHeadCss";
//       list.isOnClick = 'F';

    if (oForm.FLOW.TCH_NUM == 'jtitsm_leave_08') {
        leaveData2.isShowNoData = 'T';
    } else {
        leaveData2.isShowNoData = 'F';
    }
    buildTable(leaveData2);
}

function updOperatorRoomStaff() {//添加运营室分发人

    var param = [];

    $("table tr:has([id])").each(function (index) {
        var obj = {
            REQUEST_ID: "",
            SYSTEM_ROOM_STAFF: "",
            SYSTEM_ROOM_STAFF_ID: ""
        };
        var attrID = $(this).attr("id");
        obj.REQUEST_ID = attrID == undefined ? "" : attrID;
        $(this).find("#SYSTEM_ROOM_STAFF__" + obj.REQUEST_ID).each(function (index) {
            obj.SYSTEM_ROOM_STAFF = $(this).val();
            return false;
        });
        $(this).find("#SYSTEM_ROOM_STAFF_ID__" + obj.REQUEST_ID).each(function (index) {
            //                if (index ==0)
            obj.SYSTEM_ROOM_STAFF_ID = $(this).val();
            return false;
        });
        param[param.length] = obj;
    });

    $.ajax({
        type: "POST",
        url: "/leaveRecoveryAction/udpOperSystemRoom.do",
        cache: false,	//禁用缓存
        data: JSON.stringify(param),
        dataType: "json",
        contentType: "application/json",
        success: function (result) {
            /*  initTable(1);*/
            addSysFlag = true;
        },
        error: function (XLHttpRequest, textStatus, errorThrown) {
        }
    });

}

function updOperatorDeal() {//添加处理

    var param = [];

    $("table tr:has([id])").each(function (index) {
        var obj = {
            REQUEST_ID: "",
            DEAL_EXPLAIN: "",
            DEAL_TIME: ""
        };
//            obj.REQUEST_ID=$(this).attr("id");
        var attrID = $(this).attr("id");
        obj.REQUEST_ID = attrID == undefined ? "" : attrID;
        $(this).find("#DEAL_EXPLAIN__" + obj.REQUEST_ID).each(function (index) {

            obj.DEAL_EXPLAIN = $(this).val();
            return false;
        });
        $(this).find("#DEAL_TIME__" + obj.REQUEST_ID).each(function (index) {
            //                if (index ==0)
            obj.DEAL_TIME = $(this).val();
            return false;
        });
        param[param.length] = obj;

    });
    /*
     var param = {};
     param.REQUEST_ID=REQUEST_ID;*/
    $.ajax({
        type: "POST",
        url: "/leaveRecoveryAction/udpOperDeal.do",
        cache: false,	//禁用缓存
        data: JSON.stringify(param),
        dataType: "json",
        contentType: "application/json",
        success: function (result) {
            /*  initTable(1);*/
        },
        error: function (XLHttpRequest, textStatus, errorThrown) {
        }
    });

}


function getSystemIds(param, systemArray) {
    $.ajax({
        type: "POST",
        url: "/leaveRecoveryAction/getSystemIs.do",
        cache: false,	//禁用缓存
        async: false,//取消异步
        data: JSON.stringify(param),
        dataType: "json",
        contentType: "application/json",
        success: function (result) {
            systemArray = result.sysIds;
              return systemArray;
        },
        error: function (XLHttpRequest, textStatus, errorThrown) {
        }
    });
    return systemArray;
}

var systemArray = new Array();

function selectSystem_belongSystem() {

    if (oForm.FLOW.TCH_NUM == 'jtitsm_leave_01') {
        alert("当前环节无法添加!");
        return;
    }
    var temString = "";
    var temValue = "";
    // 传递已选中值给弹出界面
    var modulCodeArray = new Array();
    var busiClassArray = new Array();
    var regionIdArray = new Array();
    var kpiListArray = new Array();
    var dataTypeArray = new Array();
    var regionArray = new Array();
    var disciplinieArray = new Array();
    var systemArray = new Array();

    var param = {};

    param.flow_id = flow_id;
    systemArray = getSystemIds(param, systemArray);
    var bprStr = "1,2,3,4,5,6,7,8,9,28,47";
    var params = new Array();
    params.push(bprStr);
    //params.push('RELATE_SYSTEM');
    params.push('OSS_SYSTEM');
    params.push(modulCodeArray);
    params.push(busiClassArray);
    params.push(regionIdArray);
    params.push(kpiListArray);
    params.push(dataTypeArray);
    params.push(regionArray);
    params.push(disciplinieArray);
    params.push(systemArray);
    params.push("isMultiSYSREP");
    params.push("checkbox");	//单选

    var resultArr = window
            .showModalDialog("/workshop/alarm/addSelectCheck.jsp", params,
                    "resizable=yes;dialogWidth=600px;dialogHeight=560px;help=0;scroll=1;status=0;");

    param.sysIds = resultArr[0];

    $.ajax({
        type: "POST",
        url: "/leaveRecoveryAction/addOperSys.do",
        cache: false,	//禁用缓存
        data: JSON.stringify(param),
        dataType: "json",
        contentType: "application/json",
        success: function (result) {
            initTable(1);
        },
        error: function (XLHttpRequest, textStatus, errorThrown) {
        }
    });
}


function delSystem(REQUEST_ID) {

    var param = {};
    param.REQUEST_ID = REQUEST_ID;
    $.ajax({
        type: "POST",
        url: "/leaveRecoveryAction/delOperSys.do",
        cache: false,	//禁用缓存
        data: JSON.stringify(param),
        dataType: "json",
        contentType: "application/json",
        success: function (result) {
            initTable(1);
        },
        error: function (XLHttpRequest, textStatus, errorThrown) {
            alert("删除失败!");
        }
    });
}

function updDealExplain(self, requestId) {
    var $self = $(self);
    if (self.value && self.value != $self.attr('prValue')) {

    } else if (self.value == $self.attr('prValue')) {
        return;
    } else {
        alert("请填写处理说明!");
        $self.val($self.attr('prValue'));
    }
}


/*
 子流程竣工环节创建
 */
function childFlowEndEvent() {
    var flowId = formContext.FLOW.FLOW_ID;
    var nextTchNum = "jtitsm_leave_06";		//用户确认
    var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    var submitURL = "/leaveRecoveryAction.do?method=childFlowEndEvent&flowId=" + flowId + "&nextTchNum=" + nextTchNum;
    //   console("childFlowEndEvent=======" );
//        var submitURL	= "/servlet/JtitsmFormServlet?tag=80&flowId="+flowId+"&nextTchNum="+nextTchNum;

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                return true;
            } else {
                MMsg("操作失败!");
                return false;
            }
        }
    }
    xmlhttp.open("POST", submitURL, true);
    xmlhttp.send();
}
