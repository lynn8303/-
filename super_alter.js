/**
 * table: CUST_JTITSM_SUPER_ALTER
 * flow_num: jtitsm_bg
 * 
 */

var formContext;
var pathFilter = {};
var oForm;
var implementRuleValue;	//变更实施方案
var createFlag = true;//判断流程是否生成
var isFormReady = false;
var oMainMajor ;
function onFormReady(oForm)
{   
    this.oForm=oForm;	
    data_init(oForm);
	formContext = oForm;
	cur_belongSys = document.getElementById("BELONG_SYSTEM").value;
	cur_belongSysId = document.getElementById("BELONG_SYSTEM_ID").value;
	isFirst = false;
	isFormReady = true; 
	//如果是通过需求单或者问题单以及事件单生成的拆分单，那么需要自动默认，并且不允许用户编辑。
	if($request("sourceFrom")=="1" || $request("sourceFrom")=="3"){
		document.getElementById("ALTER_SOURCE").disabled =true;
	}	
	var paramStr ='{FLOW_ID:"'+getObj("FLOW_ID").value+'",start:"0",limit:"25"}'; 
	initRelFlowFrame('-1','relFLowDiv',oForm,99008000,eval('(' + paramStr + ')')); 
	
}

// 数据初始化
function data_init(oForm) {	
	// 给不同环节赋默认值
	auto_fill(oForm);
	
	//判断是否可输入
	isDisable();
	//必填加红色*
	initFormFieldMark(oForm,'CUST_JTITSM_SUPER_ALTER');
	getMainMajor();
	if(oMainMajor=='1,652,4'){
		var labelObj = findLabelByForId("VERSION_TIME");
        labelObj.insertAdjacentHTML("afterBegin","<font id=\"VERSION_TIME_WFLAG\" style=\"width:auto;color:#FFAE00;font-size:10px;font-family:'宋体';margin:0 3px 0 0;\">*</font>");
		var labelObj = findLabelByForId("PLAN_ONLINE_TIME");
        labelObj.insertAdjacentHTML("afterBegin","<font id=\"PLAN_ONLINE_TIME_WFLAG\" style=\"width:auto;color:#FFAE00;font-size:10px;font-family:'宋体';margin:0 3px 0 0;\">*</font>");
	}
	getProc(oForm);
}

//流程编号：jtitsm_bg 
//表名：CUST_JTITSM_SUPER_ALTER
function auto_fill(oForm) {
	var tch_mod = oForm.FLOW.TCH_NUM;
	if(tch_mod=='jtitsm_bg_xj' || tch_mod=='jtitsm_bg_ng' || tch_mod=='jtitsm_bg_jhzd' || tch_mod=='jtitsm_bg_ss'){
		document.getElementById('UnionReleaseBtn').style.display='block';
	}else{
		document.getElementById('UnionReleaseBtn').insertAdjacentHTML("afterEnd","<span style='width:5.75%'>&nbsp;</span>");
	}
	if(document.getElementById("AUDIT_RESULT_12375").value){
		document.getElementById("JTITSM_12375_DIV").style.display='block';
	}
	loadModels();//显示涉及业务模块
	switch (tch_mod) {
		// 变更申请：		
		case 'jtitsm_bg_xj':			
			createFlag = false;	
			break;			
		// 变更拟稿：
		case 'jtitsm_bg_ng':			
			document.getElementById("SUBMIT_DATE").value = getCurrentTimeFormat();
			break;
		// 变更计划与方案制定：
		case 'jtitsm_bg_jhzd':					
			findLabelByForId("ALTER_TYPE").insertAdjacentHTML("afterBegin","<font id=\"ALTER_TYPE_WFLAG\" style=\"width:auto;color:#FFAE00;font-size:10px;font-family:'宋体';margin:0 3px 0 0;\">*</font>");
			break;
		// 变更前审批：
		case 'jtitsm_bg_qsh':			
			document.getElementById('con_12511').style.display="block";
			break;
		// 变更实施：
		case 'jtitsm_bg_ss':			
			document.getElementById('con_12511').style.display="block";			
			initFlowProDiv("flowProDiv",document.all.flowProgressData,oForm,"flowProButs");	
			break;
		// 变更后审核:
		case 'jtitsm_bg_hsh' :			
			document.getElementById('con_bzhsh').style.display="block";
			document.getElementById('con_12511').style.display="block";
			initFlowProDiv2("flowProDiv",document.all.flowProgressData,oForm,"flowProButs");  
			break;
		// 转测试流程:
		case 'jtitsm_bg_cs' :			
			document.getElementById('con_12511').style.display="block";
			initFlowProDiv2("flowProDiv",document.all.flowProgressData,oForm,"flowProButs");  
			break;	
		// 等待发布:
		case 'jtitsm_bg_wait_publish' :			
			document.getElementById('con_12511').style.display="block";
			initFlowProDiv2("flowProDiv",document.all.flowProgressData,oForm,"flowProButs");  
			break;	
	    //归档:
	    case 'jtitsm_bg_gd':	    	
	    	document.getElementById('con_12511').style.display="block";
	    	document.getElementById("JTITSM_900191_DIV").style.display='block';
	        initFlowProDiv2("flowProDiv",document.all.flowProgressData,oForm,"flowProButs");  
			break;
		//变更测试
	    case 'jtitsm_900191':	       
	       document.getElementById('con_12511').style.display="block";
	       break;
        //版本分配
        case 'jtitsm_900192':           
           document.getElementById('con_12511').style.display="block";
           findLabelByForId("version_plan").insertAdjacentHTML("afterBegin","<font id=\"version_plan_WFLAG\" style=\"width:auto;color:#FFAE00;font-size:10px;font-family:'宋体';margin:0 3px 0 0;\">*</font>");
           break;
        //用户测试
	    case 'JTITSM_12375':	       
	       document.getElementById('con_12511').style.display="block";
	       document.getElementById("JTITSM_900191_DIV").style.display='block';
	       break;
	    case 'jtitsm_bg_ltcs':
	    	document.getElementById('con_12511').style.display="block";
	    	break;
	    case 'jtitsm_bg_csfb':
	    	document.getElementById('con_12511').style.display="block";
	    	if(ifFromPro4gOrMarket4g()){
	    		document.getElementById('JT_TEST_STAFF_INFO_DEV').style.display="block";
	    		document.getElementById('TEST_ATTACHS_DIV').style.display="block";
	    	}
	    	break;
	    case 'jtitsm_bg_gq':
	    	document.getElementById('con_12511').style.display="block";
	    	break;
	    case 'jtitsm_4g_xtfazd'://系统方案制定（CRM-4G）
	    	document.getElementById('ALTER_FINISH_DIV').style.display="none";
	    	document.getElementById('ALTER_FINISH_ATTACH_DIV').style.display="none";
	    	if(ifFromPro4gOrMarket4g()){
	    		document.getElementById('JT_TEST_STAFF_INFO_DEV').style.display="block";
	    		document.getElementById('TEST_ATTACHS_DIV').style.display="block";
	    	}
	    	break;
	    case 'jtitsm_4g_ssss'://系统实施与测试
	    	document.getElementById('ALTER_FINISH_DIV').style.display="none";
	    	document.getElementById('ALTER_FINISH_ATTACH_DIV').style.display="none";
	    	if(ifFromPro4gOrMarket4g()){
	    		document.getElementById('JT_TEST_STAFF_INFO_DEV').style.display="block";
	    		document.getElementById('TEST_ATTACHS_DIV').style.display="block";
	    	}
	    	break;
	}
	
	if(document.getElementById("ALTER_TYPE").disabled&&oForm.FLOW.TCH_NUM!='jtitsm_900192'){
		
		if(document.getElementById("VERSION_NAME").value){
			document.getElementById("version_plan").insertAdjacentHTML("beforeEnd", "<span onclick='popVersionManage("+
			document.getElementById("VERSION_ID").value
			+")' style='color:blue;cursor:hand' onmouseover='this.style.textDecoration=\"underline\"' onmouseout='this.style.textDecoration=\"none\"' >"+
			document.getElementById("VERSION_NAME").value+"</span>");
			document.getElementById("VERSION_NAME").style.display='none';
			document.getElementById("VERSION_TIME").style.backgroundColor='#ECF0F2';
			document.getElementById("VERSION_TIME").style.border='none';
			document.getElementById("VERSION_NAME_L").innerHTML = "版本计划:";
		}
	}
    if(oForm.FLOW.TCH_NUM=='jtitsm_900192'){
        document.getElementById("DEV_PER_DAY").readOnly = false;
        document.getElementById("PLAN_ONLINE_TIME").disabled = false;
        document.getElementById("ALTER_TYPE").disabled = true;
    }
	if(document.getElementById("ENABLE_RELATE").disabled){
		document.getElementById("editRelateDiv").style.display = "none";
	}
	if(tch_mod=="jtitsm_bg_jhzd" || tch_mod == "jtitsm_4g_xtfazd" || $("#con_12511").is(":visible")
		|| oForm.TABLE.CUST_JTITSM_SUPER_ALTER.ALTER_TYPE.DEFAULT_VALUE){//若变更分类为可见，初始化变更分类列表
		getAlterTypeList();
		initSelectList();
	}
	if(oForm.FLOW.TCH_NUM!='jtitsm_bg_ss' && getObjValue("FINISH_TIME")){
		document.getElementById('con_8326').style.display="block";
	}
}

//判断是否可输入
function isDisable(){
	
	if(document.getElementById("EFFECT_ORG_NAME").disabled){
    	setObjDisable("EFFECT_ORG_NAME_I");
    }
	if(document.getElementById("EFFECT_SYSTEM").disabled){
    	setObjDisable("EFFECT_SYSTEM_I");
    }
	if(document.getElementById("PLAN_IMPLEMENT_PERSON_NAME").disabled){
    	setObjDisable("PLAN_IMPLEMENT_PERSON_NAME_I");
    }
	if(document.getElementById("IMPLEMENT_VERSION").disabled){
    	setObjDisable("IMPLEMENT_VERSION_I");
    }
}

//加载发布版本信息：
function setVersionInfo(){
	var flowId = oForm.FLOW.FLOW_ID;
	var url = "/servlet/versionManage?";
	var submitURL = url + "tag=10&flowId=" + flowId;
	var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.Open("POST",submitURL,true);
    xmlhttp.send();
      
    var dXML = new ActiveXObject("Microsoft.XMLDOM");
    dXML.load(xmlhttp.responseXML);
	if(dXML.selectSingleNode("/root/Msg/VERSION_NAME") == null){
	    document.getElementById("RELA_VERSION_DIV").innerHTML = "<font style='margin-left:5px;color:#777777;'>无法显示版本信息（请确认：关联发布单是否设置“发布版本”）。</font>";
		return;
	}
    var versionId = dXML.selectSingleNode("/root/Msg/VERSION_ID").text;			 	//版本id
    document.getElementById("VERSION_NAME").innerHTML = "<font onclick='popVersionManage("+versionId+")' style='color:#0055EA;text-decoration:underline;cursor:hand;padding-left:3px;' onMouseOver=\"this.style.color='#FF0000'\" onMouseOut=\"this.style.color='#0055EA'\">"+dXML.selectSingleNode("/root/Msg/VERSION_NAME").text+"</font>";			 	//版本名称
    document.getElementById("VERSION_CODE").value = dXML.selectSingleNode("/root/Msg/VERSION_CODE").text;			 	//版本号
    document.getElementById("PLAN_TIME").value = dXML.selectSingleNode("/root/Msg/PLAN_TIME").text;						//版本计划时间
    document.getElementById("COMPANY").value = dXML.selectSingleNode("/root/Msg/COMPANY").text;							//开发厂家
    document.getElementById("COMPANY_CHARGE_MAN").value = dXML.selectSingleNode("/root/Msg/COMPANY_CHARGE_MAN").text;	//厂家负责人
    document.getElementById("VERSION_STATE").value = dXML.selectSingleNode("/root/Msg/VERSION_STATE").text;				//版本状态
}

//弹出版本信息 
function popVersionManage(versionId){
    var params = new Array();
    var str = window.showModalDialog("versionManage.jsp?oper=readonly&versionId="+versionId,params,"dialogWidth=1300px;dialogHeight=600px;help=0;scroll=1;status=0;");
}

//弹出只读流程查看信息 
function showAllInfo(flow_id){
	var sFeatures = "location=0,menubar=0,resizable=1,scrollbars=1,status=0,titlebar=0,toolbar=0";
	window.open('/workshop/form/query_form.html?fullscreen=yes&flowId='+flow_id,"_blank",sFeatures);
}

//设置标题不可点击
function setObjDisable(obj){
    if (obj != "" && typeof(obj) == 'string') {
		var id = obj;
		obj = document.getElementById(id);
	}
	obj.onclick = function(){}
	obj.className = "labelNoLink";
	obj.onmouseover = function(){obj.classname = "labelNoLink";}
	obj.onmouseout = function(){obj.classname = "labelNoLink";}
	obj.title="";
}
var isLoad=false;
function onFormSubmit(oForm)
{    
	preSaveEventTitle(oForm,document.getElementById("TITLE").value);
	var tchNum=oForm.FLOW.TCH_NUM;	
	if($("#UNION_RELEASE_ID").val() && (tchNum=='jtitsm_bg_xj' || tchNum=='jtitsm_bg_ng' || tchNum=='jtitsm_bg_jhzd' || tchNum=='jtitsm_bg_ss')){
		if(!$("#UNION_RELEASE_COUNT").val()){
			EMsg("联合发布数不能为空!");
			$("#UNION_RELEASE_COUNT").focus();
			return false;
		}
		return true; 
	}
	return true;
}
 
function onClickBefore(oForm)
{
    if((getObjValue("EFFECT_LEVEL") == 2 || getObjValue("EFFECT_LEVEL") == 3) && !getObjValue("EFFECT_SYSTEM_ID")){
    	alert("请选择所影响业务系统!");
    	return false;
    }
    setCheckBoxValue();
    
    return true;
}
function to_test_after_create(alterFlowNum){
	var flowMod = getFlowModByFlowNum(alterFlowNum);//"jtitsm_13403");
	var maxWidth = screen.availWidth - 10;
	var maxHeight = screen.availHeight - 30;
	width = (typeof(width) == "undefined") ? maxWidth : width;
	height = (typeof(height) == "undefined") ? maxHeight : height;
	var top = (maxHeight - height) / 2;
	var left = (maxWidth - width) / 2;
	var oTable=oForm.TABLE;
	var tableName;
	for(var c in oTable){
       tableName=c;
    }
    var sURL="/workshop/form/index.jsp?turn=1&mainTacheMod="+oForm.FLOW.TCH_MOD+"&flowMod="+flowMod+
	"&beforeFlowMod="+oForm.FLOW.FLOW_MOD+"&mainTableName="+tableName+"&fieldType=&mainRequestId="+
	eval("oTable."+tableName+".REQUEST_ID.VALUE()");
	
	var sFeatures = new Array();
	sFeatures.push("width=" + width);
	sFeatures.push("height=" + height);
	sFeatures.push("top=" + top);
	sFeatures.push("left=" + left);
	sFeatures.push("location=" + 0);
	sFeatures.push("menubar=" + 0);
	sFeatures.push("resizable=" + 1);
	sFeatures.push("scrollbars=" + 1);
	sFeatures.push("status=" + 0);
	sFeatures.push("titlebar=" + 0);
	sFeatures.push("toolbar=" + 0);
	window.open(sURL,"TO_TEST",sFeatures.join(","),false);
 }

//短信邮件通知
function msgMailInform(){
	var flowId = oForm.FLOW.FLOW_ID;
	var staffId = oForm.globalVar.STAFF_ID;	//流程发起人
	var tacheId = oForm.FLOW.TCH_ID;
	var notifyType = 3;						//3:发送短信及邮件
	var oXMLHTTP = new ActiveXObject("Microsoft.XMLHTTP");
	oXMLHTTP.open('get','/FlowQry?FLOW_TASK=NotifyCustService&flowId='+flowId+'&staffIds='+staffId+'&notifyType='+notifyType+'&tacheId='+tacheId+'&actionType=10&remark=FLOW_ALTER_MSG_MAIL',true);
	oXMLHTTP.send();
	if(xmlhttp.status==200){
		alert("发送成功！\n\n已通过短信及邮件通知此变更单的发起人。");
	}
}

//竣工时，变更来源工单所关联的总部需求实现流程单从“等待变更单竣工”环节自动执行到“需求发起人确认”环节:
function requirementImplementAutoRun(){
	var flowId = oForm.FLOW.FLOW_ID;
	var url = '/FlowQry?FLOW_TASK=RequirementImplementAutoRun&flowId='+flowId;
	xmlhttp.Open("POST",url,true);
	xmlhttp.send();
	if(xmlhttp.status==200){
//		alert('自动执行成功!');
	}else{
		alert("变更来源工单所关联的总部需求实现流程单环节自动执行出错!");
//		return false;
	}
}

function setRelateFlag(){
	var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	xmlhttp.Open("POST",'/servlet/TEST_ALTER_RELEASE_OPT?OperType=48&flow_id='+oForm.FLOW.FLOW_ID, true);
    xmlhttp.send();
    if(isSuccess(xmlhttp)){
    	
    }else{
    	alert("更新标志位出错");
    }
}

function choosePersonInfo(oStaffId,oStaffName,oEmail,oTel)
{
    var oReturnStaff = choiceStaff(false);
	if(oReturnStaff!=null)
	{
		oStaffId.value = oReturnStaff.id;
		oStaffName.value = oReturnStaff.name
		oEmail.value = getStaffInfo(oReturnStaff.id,"EMAIL",1);
		oTel.value = getStaffInfo(oReturnStaff.id,"MOBILE",1);
	}
	
}

function doCheck()
{
   if(oDepTree.value=="0")
   {
      EMsg("请选择一个部门！")
      return false;
   }
   return true;
}

//判断id是否包含在ids集合中
function is_include(id,ids){
	for(w=0;w<ids.length;w++){
		if(id==ids[w]){
			return true;
		}
	}
	return false;
}

var addH=1;
function addHeight() {
  if (!document.getElementById('oDescribe')) return flase;
	var comment = document.getElementById('oDescribe');
	var nowH = parseInt(comment.style.height);
	nowH+=10;
	comment.style.height=nowH+"px";
	addH++;
	if (addH > 10){ 
		addH=1;
	} else {
		window.setTimeout("addHeight()","1");
	}
}
function minHeight() {
  if (!document.getElementById('oDescribe')) return flase;
	var comment = document.getElementById('oDescribe');
	var nowH = parseInt(comment.style.height);
	if (nowH > 100) {
		nowH-=10;
		comment.style.height=nowH+"px";
		addH++;
		if (addH > 10){ 
			addH=1;
		} else {
			window.setTimeout("minHeight()","1");
		}
	}
}	

function getRefAlterImp(staffId){
	if(staffId==null || staffId ==undefined) staffId = "";
	var requestIds = "";
	var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	xmlhttp.Open("get",'/servlet/TEST_ALTER_RELEASE?action=84&flow_id='+oForm.FLOW.FLOW_ID, true);
	xmlhttp.send();
	if(xmlhttp.readyState==4 && xmlhttp.status==200){		//读取服务器响应结束
		requestIds = xmlhttp.responseXML.selectSingleNode("root/result").text;
	}
	return requestIds;
}


function setRefAlterImp(requestIds) {
	var reqArr = requestIds.split(",");
	if(reqArr.length>0){
		for(var i=0,len=reqArr.length;i<len;i++ ){
			var oHTML = '<div class="conCss" >'+
				'<form class="formsPanel_3">'+
					'<iframe src="../index.jsp?requestId='+reqArr[i]+'&hiddenToolBar=y&readOnly=y&formId=10000000138&edit=0&rnd='+Math.random()+'"'+
						'style="width: 100%; height: 70px; border: 0px solid black;background-color:#ECF0F2;overflow-y:none;"'+
						'frameborder="0"></iframe>'+
				'</form>'+
			'</div>';
			con_bzhsh.insertAdjacentHTML("beforeEnd", oHTML);
		}
	}
}
// 选择"变更所属系统":
function selectSystem_belongSystem() {
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

	systemArray = document.getElementById("BELONG_SYSTEM_ID").value.split(",");
	
//	var bprStr = getStaffBpr();	//获取用户所属的专业窜
//	if(bprStr==""){
//		bprStr = getAllPr();	//若用户未设置专业，则取所有专业
//	}
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
	params.push("radio");	//单选

	var resultArr = window
			.showModalDialog("/workshop/alarm/addSelectCheck.jsp", params,
					"resizable=yes;dialogWidth=600px;dialogHeight=560px;help=0;scroll=1;status=0;");
	if (resultArr != null) {
		if(resultArr[1].length>1){
			alert("只能选择一个系统！");
			return;
		}else{
			for (var t = 0; t < resultArr[1].length; t++) {
				if (t == resultArr[1].length - 1) {
					temString += (resultArr[1][t]);
					temValue += (resultArr[0][t]);
				} else {
					temString += (resultArr[1][t] + ",");
					temValue += (resultArr[0][t] + ",");
				}
			}
			$("#BELONG_SYSTEM").val(temString);
			$("#BELONG_SYSTEM_ID").val(temValue);
			systemChange(temValue,1);
			getFormOrderId();
		}
	}	
}

// 选择"影响系统":
function selectSystem() {
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

	systemArray = document.getElementById("EFFECT_SYSTEM_ID").value.split(",");
	
	/*
	var bprStr = getStaffBpr();	//获取用户所属的专业窜
	if(bprStr==""){
		bprStr = getAllPr();	//若用户未设置专业，则取所有专业
	}
	*/
	var bprStr = "1,2,3,4,5,6,7,8,9,28,47";
	var params = new Array();
	params.push(bprStr);
	params.push('RELATE_SYSTEM');
	params.push(modulCodeArray);
	params.push(busiClassArray);
	params.push(regionIdArray);
	params.push(kpiListArray);
	params.push(dataTypeArray);
	params.push(regionArray);
	params.push(disciplinieArray);
	params.push(systemArray);
	params.push("isMultiSYSREP");
	params.push("radio");	//复选框
	
	var resultArr = window
			.showModalDialog("/workshop/alarm/addSelectCheck.jsp", params,
					"resizable=yes;dialogWidth=600px;dialogHeight=560px;help=0;scroll=1;status=0;");
	if (resultArr != null) {
		for (var t = 0; t < resultArr[1].length; t++) {
			if (t == resultArr[1].length - 1) {
				temString += (resultArr[1][t]);
				temValue += (resultArr[0][t]);
			} else {
				temString += (resultArr[1][t] + ",");
				temValue += (resultArr[0][t] + ",");
			}
		}
		$("#EFFECT_SYSTEM").val(temString);
		$("#EFFECT_SYSTEM_ID").val(temValue);
	}
}

function super_alter_on_after_finish_judge(flowId,tchNum){
    if(tchNum=='jtitsm_bg_gd'){//竣工后 将关联的总部需求待办显示
        var oXMLHTTP = new ActiveXObject("Microsoft.XMLHTTP");
        oXMLHTTP.open("POST","/servlet/RequirementAction?action=101&secondflowId="+oForm.FLOW.FLOW_ID,true);
        oXMLHTTP.send("");
    }
    return true;
}
//选择部门：
function selectIssueSector() {
	getSelectedOrgComm(document.getElementById("EFFECT_ORG_NAME"),document.getElementById("EFFECT_ORG_ID"));
}

// 获取专业列表:
function getAllPr() {
	var str="";
	var sql = 'select STRCAT(bpr_line_cfg_id) text from bpr_line_cfg';
	var resObj = queryData(sql);
	if (resObj && resObj != undefined && resObj.length > 0) {
		str += resObj[0];
	}
	return str;
}

// 选择版本
function chooseVersion() {
	var relateSystemId = document.getElementById("BELONG_SYSTEM_ID").value;
	var params = [];
    var resultArr = window.showModalDialog("versionManageSearch.jsp?linkTyep=REPLEASE&fromFlow=ALTER&relate_system="+relateSystemId,params,"resizable=yes;dialogWidth="+ document.body.clientWidth +";dialogHeight=550px;help=0;scroll=1;status=0;");
    if (resultArr && resultArr.FLAG && resultArr.FLAG=="true"){
		document.getElementById("VERSION_ID").value=resultArr.VERSION_ID;
		if(resultArr.VERSION_NAME!=undefined && resultArr.VERSION_NAME!=""){
			document.getElementById("VERSION_NAME").value=resultArr.VERSION_NAME.split("_")[0];
			//document.getElementById("VERSION_TIME").value=resultArr.VERSION_NAME.split("_")[2];
			document.getElementById("VERSION_TIME").value=resultArr.PLAN_TIME;
		}		
    }

}

//根据发起人选择的涉及系统，获取流程单号
function getFormOrderId(){	
	var oXMLHTTP=new ActiveXObject("Microsoft.XMLHTTP");
	var code = $("#ALTER_ORDER_ID").val();	
	var sysId = $("#BELONG_SYSTEM_ID").val();	
	oXMLHTTP.open("POST","/servlet/TEST_ALTER_RELEASE_OPT?OperType=98&type=1&sysId="+sysId+"&code="+code,true);	
	oXMLHTTP.send();
	if(!isSuccess(oXMLHTTP)){
		return;
	}	
	$("#ALTER_ORDER_ID").val(oXMLHTTP.responseXML.selectSingleNode("//ORDERID").text);
}

function addRelate() {
	var params = new Array();
	var curFlowId=oForm.FLOW.FLOW_ID;
    var resultArr = window.showModalDialog("/workshop/form/jtitsmFormFile/reqFlowList.jsp?flowType=12&table_name=CUST_JTITSM_SUPER_ALTER&flow_id="+curFlowId,params,"resizable=yes;dialogWidth=1080px;dialogHeight=650px;help=0;scroll=1;status=0;");    
    if (!resultArr){
		relFLowFrame.location.replace("/workshop/form/jtitsmFormFile/relateTabelSearch.jsp?cfg_id=-1&key_id="+oForm.FLOW.FLOW_ID);
    }
}

function delRelate() {
	var selectedRows1 = relFLowFrame.north9Data.getPropertys("ID");
	var selectedRows2 = relFLowFrame.requireData.getPropertys("ID");
    if((selectedRows1==null || selectedRows1.length<1) && (selectedRows2==null || selectedRows2.length<1)){
		alert ("请选择一条记录");
		return;
	}
	var len1=selectedRows1.length;
    for(var i=0;i<len1;i++){
        var oXMLHTTP = new ActiveXObject("Microsoft.XMLHTTP");
        oXMLHTTP.open("POST","/servlet/RequirementAction?action=96&main_flow_id="+selectedRows1[i]+"&main_table_name=CUST_JTITSM_TF_REQUIER_NORTH9&second_flow_id="+oForm.FLOW.FLOW_ID+"&second_table_name=CUST_JTITSM_SUPER_ALTER",true);
        oXMLHTTP.send("");
    }
    var len2=selectedRows2.length;
    for(var i=0;i<len2;i++){
        var oXMLHTTP = new ActiveXObject("Microsoft.XMLHTTP");
        oXMLHTTP.open("POST","/servlet/RequirementAction?action=96&main_flow_id="+selectedRows2[i]+"&main_table_name=CUST_JTITSM_TF_REQUIRE_GROUP&second_flow_id="+oForm.FLOW.FLOW_ID+"&second_table_name=CUST_JTITSM_SUPER_ALTER",true);
        oXMLHTTP.send("");
    }
    relFLowFrame.location.replace("/workshop/form/jtitsmFormFile/relateTabelSearch.jsp?cfg_id=-1&key_id="+oForm.FLOW.FLOW_ID);
}

//将版本状态置为“待发布”
function setVersionState(){
       var oXMLHTTP=new ActiveXObject("Microsoft.XMLHTTP");  
       oXMLHTTP.open("POST","/servlet/TEST_ALTER_RELEASE_OPT?OperType=97&version_state=3&version_id="+document.getElementById("VERSION_ID").value,true);    
       oXMLHTTP.send();  
}


//获取变更分类列表
var alterTypeList="";
function getAlterTypeList(){	
	var sql="select code value,mean text,remark p_code from codelist where code_type='CUST_JTITSM_DOMAIN_SUPER_ALTER_TYPE' order by sort_id";
	var xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	xmlHttp.Open("POST","/servlet/commonservlet?tag=201&paramValue="+getAESEncode(encodeURIComponent(sql)),true);
	xmlHttp.send();
	if(isSuccess(xmlHttp)){		
		var xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
    	xmlDoc.load(xmlHttp.responseXML); 
    	alterTypeList=xmlDoc.selectNodes("/root/rowSet");    	
	}	
}

function initSelectList(){	
	var oAlterType=document.getElementById("ALTER_TYPE");
	var relateBprId=getBprIdBySysId($("#BELONG_SYSTEM_ID").val());
	if(relateBprId=="3" || relateBprId=="4" || relateBprId=="7"){
		relateBprId=relateBprId=="7"?"4":relateBprId;
	}	
	var j=0;
	oAlterType.options[j]=new Option("","");
	var flag = false;
	if(alterTypeList.length>0){					
		for(var i=0;i<alterTypeList.length;i++){
			if(relateBprId==alterTypeList[i].selectSingleNode("P_CODE").text){
				flag = true;
				++j;				
				var typeCode=alterTypeList[i].selectSingleNode("VALUE").text;				
				var typeName=alterTypeList[i].selectSingleNode("TEXT").text;
				oAlterType.options[j]=new Option(typeName,typeCode);
			}			
		}
		//
		if(!flag){
			relateBprId = -1;
			var z = 0;
			for(var i=0;i<alterTypeList.length;i++){
				if(relateBprId==alterTypeList[i].selectSingleNode("P_CODE").text){
					++z;				
					var typeCode=alterTypeList[i].selectSingleNode("VALUE").text;				
					var typeName=alterTypeList[i].selectSingleNode("TEXT").text;
					oAlterType.options[z]=new Option(typeName,typeCode);
				}			
			}
		}
		chooseSelect("ALTER_TYPE",oForm.TABLE.CUST_JTITSM_SUPER_ALTER.ALTER_TYPE.DEFAULT_VALUE);		
	}
}

//让下拉框选择某一行
function chooseSelect(objId,valueId){
	var objSelect=document.getElementById(objId);
	var optionLen = objSelect.options.length;
	var rsId = "";
	for(var i=0;i<optionLen;i++){
		var option = objSelect.options[i];						
		if(option.value==valueId){
			objSelect.options.selectedIndex=i;
			rsId = valueId;
			break;
		}
	}
	return rsId;
}

//根据业务系统ID获取对应的专业ID
function getBprIdBySysId(sysIdValue){
	var data=queryAllData("select max(relate_bpr_line) bpr_id from cust_jtitsm_busi_system where busi_system_id="+sysIdValue);
	if(typeof(data)!=undefined && data.length>0){
		return data[0].BPR_ID;
	}else{
		return "-1";
	}
}

function getUnionReleaseId(){	
	if(!$("#BELONG_SYSTEM_ID").val() || $("#BELONG_SYSTEM_ID").val()=="0"){
		EMsg("请先选择变更所属系统！");
		return;
	}	
	var oXMLHTTP=new ActiveXObject("Microsoft.XMLHTTP");	
	oXMLHTTP.open("POST","/servlet/TEST_ALTER_RELEASE_OPT?OperType=108&sysId="+$("#BELONG_SYSTEM_ID").val(),true);	
	oXMLHTTP.send();
	if(isSuccess(oXMLHTTP)){		
		var unionReleaseId=oXMLHTTP.responseXML.selectSingleNode("//UNION_RELEASE_ID").text;
		if(unionReleaseId=="-1"){
			EMsg("该系统的系统简称为空，请确认！");
			return;
		}
		$("#UNION_RELEASE_ID").val(unionReleaseId);
	}	
}

/**
 * 变更所属系统改变响应事件
 */
function systemChange(sysId,type){
	var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	var sql = "";
	if(type == 1){//首环节，生成选项
		sql = "SELECT T.BUSI_SYSTEM_ID VALUE,T.NAME TEXT FROM CUST_JTITSM_BUSI_SYSTEM T WHERE T.PARENT_SYS_ID in (" +sysId+ ") ORDER BY T.BUSI_SYSTEM_ID";
	}else if(type == 2){//后续环节，生成列表
		sql = "SELECT T.BUSI_SYSTEM_ID VALUE,T.NAME TEXT FROM CUST_JTITSM_BUSI_SYSTEM T WHERE T.BUSI_SYSTEM_ID in (" +sysId+ ") ORDER BY T.BUSI_SYSTEM_ID";
	}
	if(sql){
		var url = "/servlet/commonservlet?tag=201&paramValue="+getAESEncode(encodeURIComponent(sql));
	    xmlhttp.Open("get", url, true);
	    xmlhttp.send();
	    if (!isSuccess(xmlhttp))
	        return
	    var dXML = new ActiveXObject("Microsoft.XMLDOM");
	    dXML.load(xmlhttp.responseXML);
	    var element = dXML.selectSingleNode("/root/rowSet");
	    
	    var obj = document.getElementById("MODEL_SPAN");
	    var objDiv = document.getElementById("MODEL_DIV");
	    createCheckBox(element,obj,objDiv,type);
	}
}

/**
 * 加载涉及业务模块
 */
function loadModels(){
	var modelValues = document.getElementById("MODELS").value;
	var sysIds = document.getElementById("BELONG_SYSTEM_ID").value;
	if(oForm.FLOW.TCH_NUM == 'jtitsm_bg_ss' && sysIds){//变更实施环节，涉及业务系统可编辑
		systemChange(sysIds,1);//生成复选框
		if(modelValues){
			setCheckBoxValueById("SJMLcheckbox",modelValues);//生成选中框
		}
	}else if(modelValues){
		systemChange(modelValues,2);
	}
}

/**
 * 生成涉及业务模块复选框
 * @param {} element
 * @param {} obj
 */
function createCheckBox(element,obj,objDiv,type){
	objDiv.style.display = "none";
	var iHtml = "";
	if(element != null){
    	objDiv.style.display = "block";
    }
    var check = " disabled  checked ";
    if(type == 1){
    	check = "";
    }
    obj.innerHTML = iHtml;
	while (element != null) {
        var text = element.selectSingleNode("TEXT").text;
        var val = element.selectSingleNode("VALUE").text;
        iHtml += "<table width='auto' border='0' cellspacing='0' cellpadding='0' style='float:left;height:20px;margin:0 3px 0 0;padding:0px;border:0px solid #ccc;'>" + 
			"<tr>" +
				"<td width='20px' style='margin:0px;padding:0px;'>" +
       				"<input type='checkbox' name='SJMLcheckbox' id='SJMLcheckbox_" + val + "' value='" + val + "'"  + check +
       					" style='height:19px;margin:0px;padding:0px;' />" +
       			"</td>" +
       			"<td style='margin:0px;padding:3px 0 0 0;white-space:nowrap;'>" +
       				"<label for='SJMLcheckbox_" + val + "' style='cursor:hand;'>"+ text +"</label>" +
       			"</td>" +
       		"</tr>" +
       "</table>\n";
        element = element.nextSibling;
        
    }
    obj.insertAdjacentHTML("beforeEnd",iHtml);
}

function setCheckBoxValue(){
	var objs = document.getElementsByName("SJMLcheckbox");
	var n=0;
	var chStr = "";
	for(var i=0; objs.length>i; i++){
		if(objs[i].checked == true ){
			n++;
			if(n==1){
				chStr += objs[i].value;
			}else{
				chStr += ","+objs[i].value;
			}
		}
	}
	document.getElementById("MODELS").value = chStr;
}

function setCheckBoxValueById(objid,id){
	var obj=document.getElementsByName(objid);
	var ids=id.split(",");
	for (var k=0;k<obj.length;k++ ){
	  for (var j=0;j<ids.length ;j++ ){
	    if(parseInt(ids[j]) == parseInt(obj[k].value)){
	   		obj[k].checked=true;
	   		break;
	   	}
	  }
	}
}

function getVersionId(){
	return document.getElementById("VERSION_ID").value;
}

//获取主流程的major、business,用来判断1)	测试时间、2)	开发要求完成时间是否必填
function getMainMajor(){
	var major;
	var business;
	var tag;
	var oXMLHTTP = new ActiveXObject("Microsoft.XMLHTTP");
   	oXMLHTTP.open("get", "/servlet/TEST_ALTER_RELEASE_OPT?OperType=113&flowId="+oForm.FLOW.FLOW_ID, true);
   	oXMLHTTP.send();
   	if (!isSuccess(oXMLHTTP)){
  		MMsg("获取专业失败！");
  		return false;
  	}
  	var returnXml = new ActiveXObject("Microsoft.XMLDOM");
  	returnXml.load(oXMLHTTP.responseXML);
  	var element = returnXml.selectNodes("/root/rowSet");
  	if(element.length){
  		major = element[0].selectSingleNode("MAJOR").text;
  		business = element[0].selectSingleNode("BUSINESS").text;
   	}
   	tag= major+','+business;
   	oMainMajor=tag;
}

function judgeRequire(){
   	if(oMainMajor == '1,652,4'){
   		if($("#VERSION_TIME").val()==''){
   			alert("“测试时间”不能为空");
   			return false;
   		}
   		if($("#PLAN_ONLINE_TIME").val()==''){
   			alert("“开发要求完成时间”不能为空");
   			return false;
   		}
   	}
   	return true;
}


/**
 * 变更单是否来源于“省4G需求”衍生的总部需求 或者  集团市场部派发的总部需求单
 */
function ifFromPro4gOrMarket4g(){	
	var count = 0;
	var flowId = oForm.FLOW.FLOW_ID;
	var oXMLHTTP=new ActiveXObject("Microsoft.XMLHTTP");	
	oXMLHTTP.open("POST","/servlet/TEST_ALTER_RELEASE_OPT?OperType=114&flowId=" + flowId,true);	
	oXMLHTTP.send();
	if(isSuccess(oXMLHTTP)){
		count = oXMLHTTP.responseXML.selectSingleNode("//COUNT").text;
	}
	return count>0;
}


/**
 * 下一环节创建前执行函数
 * @param nextTchNum
 */
function onBeforeCreate(nextTchNum){
	var tchNum = oForm.FLOW.TCH_NUM;	

	if(nextTchNum == "jtitsm_bg_gq" && (tchNum == "jtitsm_4g_xtfazd" || tchNum == "jtitsm_4g_ssss" || tchNum == "jtitsm_bg_csfb") && ifFromPro4gOrMarket4g()){//下一环节为变更单挂起
		if($("#IT_TEST_STAFF").val()==''){
   			alert("“集团IT配合测试人员”不能为空");
   			return false;
   		}
//		if(!getObj("TEST_ATTACHS").value){
//   			alert("请上传“测试文档”");
//   			return false;
//   		}
	}
	
	return true;
}
function getnewPoint(){
	//	document.getElementById("addNewPonit").style.display = "block";
		$("#addNewPonit").css('display','block');
		$("#SYETEM_NAME").val($('#BELONG_SYSTEM').val());
		

}
var editIndex='';
function getnewPoint1(index){
	//	document.getElementById("addNewPonit").style.display = "block";
		$("#updatePonit").css('display','block');
		$("#SYETEM_NAME1").val($('#BELONG_SYSTEM').val());
		$("#FUNC_TYPE1").val($('#FUNC_TYPE').val());
		$("#SYETEM_NAME1").val($('#BELONG_SYSTEM').val());
editIndex=index;
}
//获取下一个sequence值
function getNextSeq(seqName){
	var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    var actionUrl = "/servlet/jtitsmNewPointServlet?tag=2&seqName="+seqName;//isLoadCategory = eval(isLoadCategory);
	xmlhttp.open("POST", actionUrl,true);
    xmlhttp.send("");
    if(isSuccess(xmlhttp)) {
        var dXML = xmlhttp.responseXML;
        var oRows = dXML.selectNodes("/root/Msg");
		if(oRows.length > 0) {
			return oRows[0].selectSingleNode("SEQ").text;
		}
    }
    return '';
}
function getAttchName(){

}
function addNewPoint(){	
  	var attch=$("#ATTATC_NAME").val();
 	var  xmlDoc = $.parseXML( attch ),
      $xml = $( xmlDoc ),
      $title = $xml.find( 'NAME' );	   
  
 
	var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	var CUST_JTITSM_ADDPOINT_ID=getNextSeq('Cust_Jtitsm_Newpoint_Seq');
	$("#SYETEM_NAME").val($('#BELONG_SYSTEM').val());
	var FUNCTION_POINT_TYPE=$("#FUNC_TYPE").val();
	var FUNCTION_POINT_NAME=$("#FUNC_NAME").val();
	var FUNCTION_POINT_DESCRIPTION=$("#FUNC_DESC").val();
	
	var addXML = '<?xml version="1.0" encoding="utf-8"?>'
		   + '	<root><rowSet>'
		   +'<ATTATC_URL></ATTATC_URL><ATTATC_NAME>'+$title.text()+'</ATTATC_NAME>'
		   +'<SYETEM_NAME>'+$('#BELONG_SYSTEM').val()+'</SYETEM_NAME><FLOW_MOD>'+oForm.FLOW.FLOW_ID+'</FLOW_MOD>'
		   +'<FUNCTION_POINT_NAME>'+FUNCTION_POINT_NAME+'</FUNCTION_POINT_NAME><FUNCTION_POINT_TYPE>'+FUNCTION_POINT_TYPE+'</FUNCTION_POINT_TYPE>'
		   +'<FUNCTION_POINT_DESCRIPTION>'+FUNCTION_POINT_DESCRIPTION+'</FUNCTION_POINT_DESCRIPTION>'
		   +'<FLOW_ID>'+oForm.FLOW.FLOW_ID+'</FLOW_ID><CUST_JTITSM_ADDPOINT_ID>'+CUST_JTITSM_ADDPOINT_ID+'</CUST_JTITSM_ADDPOINT_ID>';

	addXML += '</rowSet></root>';
	xmlhttp.Open("POST",'/servlet/jtitsmNewPointServlet?tag=1&flow_id='+oForm.FLOW.FLOW_ID+'&flow_mod='+oForm.FLOW.FLOW_ID+'', false);
    xmlhttp.send(addXML);
   	document.getElementById("addNewPonit").style.display = "none";
    
    if(xmlhttp.status == 200){
    	var responseText=xmlhttp.responseText;
    	var dXML = new ActiveXObject("Microsoft.XMLDOM");
    	dXML.load(xmlhttp.responseXML);
    	var status=dXML.selectSingleNode("/root/msg").text;
    	if(status==0){
			if(xmlhttp.responseText)
      			document.getElementById("addNewPonit").style.display = "none";
     	   	var obj=$("#function_point_table_content").html();
     	    var   iHtml='';			
     	    var index= $("#function_point_table > tr").size()+1;    
     	  
     	    var ADDPOINT_ID =dXML.selectSingleNode("/root/CUST_JTITSM_ADDPOINT_ID").text;
  	 	  	iHtml='<tr style="text-align:center;">'
			+'<td>'+index+'<input id="funcId" type="hidden" value="'+ADDPOINT_ID+'"/></td>'//<input type="hidden" value="'+$(responseText).children("msg").text()+'"/>
			+'<td>'+FUNCTION_POINT_NAME+'</td>'
			+'<td>'+FUNCTION_POINT_TYPE+'</td>'
			+'<td>'+FUNCTION_POINT_DESCRIPTION+'</td>'
			+'<td><a href="">'+$title.text()+'</a></td>'
			+'<td><img src="flowV2/img/edit.png" onclick="getnewPoint1('+index+');"> <img src="flowV2/img/rab.png" onclick="deleteNewPoint('+index+','+ADDPOINT_ID+');"></td>'
			+'</tr>';

    	   	obj+=iHtml;
    	   	$("#function_point_table_content").html(obj);
    	   
    	}else{
			alert("xml文档格式错误!");
    	}
    

    }else{
    	alert("更新标志位出错");
    }
}

function updateNewPoint(){	
	var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	var CUST_JTITSM_ADDPOINT_ID=$("#FUNCTION_POINT_TYPE").val();
	$("#SYETEM_NAME").val($('#BELONG_SYSTEM').val());
	var FUNCTION_POINT_TYPE=$("#FUNC_TYPE1").val();
	var FUNCTION_POINT_NAME=$("#FUNC_NAME1").val();
	var FUNCTION_POINT_DESCRIPTION=$("#FUNC_DESC1").val();
	
	var addXML = '<?xml version="1.0" encoding="utf-8"?>'
	   + '	<root><rowSet>'
	   +'<ATTATC_URL></ATTATC_URL><ATTATC_NAME></ATTATC_NAME>'
	   +'<SYETEM_NAME>'+$('#BELONG_SYSTEM').val()+'</SYETEM_NAME><FLOW_MOD>'+oForm.FLOW.FLOW_ID+'</FLOW_MOD>'
	   +'<FUNCTION_POINT_NAME>'+FUNCTION_POINT_NAME+'</FUNCTION_POINT_NAME><FUNCTION_POINT_TYPE>'+FUNCTION_POINT_TYPE+'</FUNCTION_POINT_TYPE>'
	   +'<FUNCTION_POINT_DESCRIPTION>'+FUNCTION_POINT_DESCRIPTION+'</FUNCTION_POINT_DESCRIPTION>'
	   +'<FLOW_ID>'+oForm.FLOW.FLOW_ID+'</FLOW_ID><CUST_JTITSM_ADDPOINT_ID>'+CUST_JTITSM_ADDPOINT_ID+'</CUST_JTITSM_ADDPOINT_ID>';

	addXML += '</rowSet></root>';
	xmlhttp.Open("POST",'/servlet/jtitsmNewPointServlet?tag=3&flow_id='+oForm.FLOW.FLOW_ID, true);
    xmlhttp.send(addXML);
    var ret = xmlhttp.ResponseXML.xml;

    if(xmlhttp.status == 200){
        document.getElementById("updatePonit").style.display = "none";
    
    	var responseText=xmlhttp.responseText;
    	var status=$(responseText).children("msg").text();
    	if(status==0){
		if(xmlhttp.responseText)
     
             $("#function_point_table tr").eq(editIndex).find("td").eq(1).text($("#FUNC_NAME1").val());
             $("#function_point_table tr").eq(editIndex).find("td").eq(2).text($("#FUNC_TYPE1").val());
             $("#function_point_table tr").eq(editIndex).find("td").eq(3).text($("#FUNC_DESC1").val());
             $("#function_point_table tr").eq(editIndex).find("td").eq(4).text();
     
    	   
    	}else{
			alert("xml文档格式错误!");
    	}
    

    }else{
    	alert("更新标志位出错");
    }


 
}
function deleteNewPoint(index,id){	

  	var r=confirm("请确认是否要删除该功能点");
  	if (r==true){
  		var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  		var addXML = '<?xml version="1.0" encoding="utf-8"?>'
  			+ '	<root><DELETE_IDS>'+id+'</DELETE_IDS><rowSet>';
  		addXML += '</rowSet></root>';
		xmlhttp.Open("POST",'/servlet/jtitsmNewPointServlet?tag=4&flow_id='+oForm.FLOW.FLOW_ID, false);
 	   	xmlhttp.send(addXML);
 	   	var ret = xmlhttp.ResponseXML.xml;

  	  	if(isSuccess(xmlhttp)){
    	  	$("#function_point_table tr").eq(index).remove();
  	  	}else{
  	  		alert("更新标志位出错");
   	 	}
 	}else{
   		return false;
    }
	
}
function getNewPointList(){	

	var function_point_table_content=document.getElementById("function_point_table_content");
	var SYETEM_NAME=document.getElementById("SYETEM_NAME");
	var FUNCTION_POINT_TYPE=document.getElementById("FUNCTION_POINT_TYPE");
	var FUNCTION_POINT_NAME=document.getElementById("FUNCTION_POINT_NAME");
	var FUNCTION_POINT_DESCRIPTION=document.getElementById("FUNCTION_POINT_DESCRIPTION");
	
	var iHtml='';
	var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	var addXML = '<?xml version="1.0" encoding="utf-8"?>'
		   + '	<root><FUNCTION_POINT_NAME>'+FUNCTION_POINT_NAME+'</FUNCTION_POINT_NAME><FUNCTION_POINT_DESCRIPTION>'+FUNCTION_POINT_DESCRIPTION+'</FUNCTION_POINT_DESCRIPTION>'+
		   '<FUNCTION_POINT_TYPE>'+FUNCTION_POINT_TYPE+'</FUNCTION_POINT_TYPE><ATTATC_URL>'+SYETEM_NAME+'</ATTATC_URL><ATTATC_URL>kkkkkkkk</ATTATC_URL>'+
		   '<CUST_JTITSM_ADDPOINT_ID>111</CUST_JTITSM_ADDPOINT_ID><rowSet>';

	addXML += '</rowSet></root>';
	xmlhttp.Open("POST",'/servlet/jtitsmNewPointServlet?tag=5&flow_id='+oForm.FLOW.FLOW_ID, false);
   	xmlhttp.send(addXML);

    if(isSuccess(xmlhttp)){
    	tml+=	'<tr style="text-align:center;">'
		+'<td>1</td>'
		+'<td>新增</td>'
		+'<td>新增</td>'
		+'<td>新增，请审批</td>'
		+'<td><a>操作说明</a></td>'
		+'<td><img src="flowV2/img/edit.jpg" onclick="getnewPoint();"> <img src="flowV2/img/rab.png" onclick="deleteNewPoint();"></td>'
		+'</tr>';
    	 function_point_table_content.insertAdjacentHTML("beforeEnd",iHtml);
    }else{
    	alert("标志位出错");
    }
    document.getElementById("addNewPonit").style.display = "block";   
}
function close1(){
   document.getElementById("addNewPonit").style.display = "none";
}
//获取
function getFuncRight(systemName){
	var IS_EXSIST=false;
	var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    var actionUrl = "/servlet/jtitsmNewPointServlet?tag=7&systemName="+systemName;//isLoadCategory = eval(isLoadCategory);
	xmlhttp.open("POST", actionUrl,false);
	var addXML ='';
    xmlhttp.send(addXML);
    if(isSuccess(xmlhttp)) {
        var dXML = xmlhttp.responseXML;
        var oRows = dXML.selectNodes("/root/Msg");
		if(oRows.length > 0) {
			IS_EXSIST=oRows[0].selectSingleNode("IS_EXSIST").text;
		}
		   return IS_EXSIST;
    }
    return IS_EXSIST;
}
function onAppend() {
	var contains='';
	contains=getFuncRight($("#BELONG_SYSTEM").val());
	if(oForm.FLOW.TCH_NUM == 'jtitsm_bg_ss'){
		
		if(contains){
		    $("#con_83267").css({"display":"none"});
	
		}else{
	 		$("#con_83267").css({"display":"block"});
		}
	}
}
function onFormSubmit(oForm){
	var contains='';
	contains=getFuncRight($("#BELONG_SYSTEM").val());
	if(oForm.FLOW.TCH_NUM == 'jtitsm_bg_ss'){
		if(contains){
		   var function_point_table_content=document.getElementById("function_point_table_content");
		    if(function_point_table_content==''){
		    	alert("请添加关联功能点");
		    }
		}else{
	 		
		}

}
}
function refresh(){
	var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    var actionUrl = "/servlet/jtitsmNewPointServlet?tag=10";//isLoadCategory = eval(isLoadCategory);
	xmlhttp.open("POST", actionUrl,false);
	var addXML ='';
    xmlhttp.send(addXML);
    	  if(isSuccess(xmlhttp)){
  	}else{
    	alert("更新标志位出错");
   	}
}
