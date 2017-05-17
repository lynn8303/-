/**
 * table: CUST_JTITSM_SUPER_ALTER
 * flow_num: jtitsm_bg
 * 
 */

var formContext;
var pathFilter = {};
var oForm;
var implementRuleValue;	//���ʵʩ����
var createFlag = true;//�ж������Ƿ�����
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
	//�����ͨ�����󵥻������ⵥ�Լ��¼������ɵĲ�ֵ�����ô��Ҫ�Զ�Ĭ�ϣ����Ҳ������û��༭��
	if($request("sourceFrom")=="1" || $request("sourceFrom")=="3"){
		document.getElementById("ALTER_SOURCE").disabled =true;
	}	
	var paramStr ='{FLOW_ID:"'+getObj("FLOW_ID").value+'",start:"0",limit:"25"}'; 
	initRelFlowFrame('-1','relFLowDiv',oForm,99008000,eval('(' + paramStr + ')')); 
	
}

// ���ݳ�ʼ��
function data_init(oForm) {	
	// ����ͬ���ڸ�Ĭ��ֵ
	auto_fill(oForm);
	
	//�ж��Ƿ������
	isDisable();
	//����Ӻ�ɫ*
	initFormFieldMark(oForm,'CUST_JTITSM_SUPER_ALTER');
	getMainMajor();
	if(oMainMajor=='1,652,4'){
		var labelObj = findLabelByForId("VERSION_TIME");
        labelObj.insertAdjacentHTML("afterBegin","<font id=\"VERSION_TIME_WFLAG\" style=\"width:auto;color:#FFAE00;font-size:10px;font-family:'����';margin:0 3px 0 0;\">*</font>");
		var labelObj = findLabelByForId("PLAN_ONLINE_TIME");
        labelObj.insertAdjacentHTML("afterBegin","<font id=\"PLAN_ONLINE_TIME_WFLAG\" style=\"width:auto;color:#FFAE00;font-size:10px;font-family:'����';margin:0 3px 0 0;\">*</font>");
	}
	getProc(oForm);
}

//���̱�ţ�jtitsm_bg 
//������CUST_JTITSM_SUPER_ALTER
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
	loadModels();//��ʾ�漰ҵ��ģ��
	switch (tch_mod) {
		// ������룺		
		case 'jtitsm_bg_xj':			
			createFlag = false;	
			break;			
		// �����壺
		case 'jtitsm_bg_ng':			
			document.getElementById("SUBMIT_DATE").value = getCurrentTimeFormat();
			break;
		// ����ƻ��뷽���ƶ���
		case 'jtitsm_bg_jhzd':					
			findLabelByForId("ALTER_TYPE").insertAdjacentHTML("afterBegin","<font id=\"ALTER_TYPE_WFLAG\" style=\"width:auto;color:#FFAE00;font-size:10px;font-family:'����';margin:0 3px 0 0;\">*</font>");
			break;
		// ���ǰ������
		case 'jtitsm_bg_qsh':			
			document.getElementById('con_12511').style.display="block";
			break;
		// ���ʵʩ��
		case 'jtitsm_bg_ss':			
			document.getElementById('con_12511').style.display="block";			
			initFlowProDiv("flowProDiv",document.all.flowProgressData,oForm,"flowProButs");	
			break;
		// ��������:
		case 'jtitsm_bg_hsh' :			
			document.getElementById('con_bzhsh').style.display="block";
			document.getElementById('con_12511').style.display="block";
			initFlowProDiv2("flowProDiv",document.all.flowProgressData,oForm,"flowProButs");  
			break;
		// ת��������:
		case 'jtitsm_bg_cs' :			
			document.getElementById('con_12511').style.display="block";
			initFlowProDiv2("flowProDiv",document.all.flowProgressData,oForm,"flowProButs");  
			break;	
		// �ȴ�����:
		case 'jtitsm_bg_wait_publish' :			
			document.getElementById('con_12511').style.display="block";
			initFlowProDiv2("flowProDiv",document.all.flowProgressData,oForm,"flowProButs");  
			break;	
	    //�鵵:
	    case 'jtitsm_bg_gd':	    	
	    	document.getElementById('con_12511').style.display="block";
	    	document.getElementById("JTITSM_900191_DIV").style.display='block';
	        initFlowProDiv2("flowProDiv",document.all.flowProgressData,oForm,"flowProButs");  
			break;
		//�������
	    case 'jtitsm_900191':	       
	       document.getElementById('con_12511').style.display="block";
	       break;
        //�汾����
        case 'jtitsm_900192':           
           document.getElementById('con_12511').style.display="block";
           findLabelByForId("version_plan").insertAdjacentHTML("afterBegin","<font id=\"version_plan_WFLAG\" style=\"width:auto;color:#FFAE00;font-size:10px;font-family:'����';margin:0 3px 0 0;\">*</font>");
           break;
        //�û�����
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
	    case 'jtitsm_4g_xtfazd'://ϵͳ�����ƶ���CRM-4G��
	    	document.getElementById('ALTER_FINISH_DIV').style.display="none";
	    	document.getElementById('ALTER_FINISH_ATTACH_DIV').style.display="none";
	    	if(ifFromPro4gOrMarket4g()){
	    		document.getElementById('JT_TEST_STAFF_INFO_DEV').style.display="block";
	    		document.getElementById('TEST_ATTACHS_DIV').style.display="block";
	    	}
	    	break;
	    case 'jtitsm_4g_ssss'://ϵͳʵʩ�����
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
			document.getElementById("VERSION_NAME_L").innerHTML = "�汾�ƻ�:";
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
		|| oForm.TABLE.CUST_JTITSM_SUPER_ALTER.ALTER_TYPE.DEFAULT_VALUE){//���������Ϊ�ɼ�����ʼ����������б�
		getAlterTypeList();
		initSelectList();
	}
	if(oForm.FLOW.TCH_NUM!='jtitsm_bg_ss' && getObjValue("FINISH_TIME")){
		document.getElementById('con_8326').style.display="block";
	}
}

//�ж��Ƿ������
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

//���ط����汾��Ϣ��
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
	    document.getElementById("RELA_VERSION_DIV").innerHTML = "<font style='margin-left:5px;color:#777777;'>�޷���ʾ�汾��Ϣ����ȷ�ϣ������������Ƿ����á������汾������</font>";
		return;
	}
    var versionId = dXML.selectSingleNode("/root/Msg/VERSION_ID").text;			 	//�汾id
    document.getElementById("VERSION_NAME").innerHTML = "<font onclick='popVersionManage("+versionId+")' style='color:#0055EA;text-decoration:underline;cursor:hand;padding-left:3px;' onMouseOver=\"this.style.color='#FF0000'\" onMouseOut=\"this.style.color='#0055EA'\">"+dXML.selectSingleNode("/root/Msg/VERSION_NAME").text+"</font>";			 	//�汾����
    document.getElementById("VERSION_CODE").value = dXML.selectSingleNode("/root/Msg/VERSION_CODE").text;			 	//�汾��
    document.getElementById("PLAN_TIME").value = dXML.selectSingleNode("/root/Msg/PLAN_TIME").text;						//�汾�ƻ�ʱ��
    document.getElementById("COMPANY").value = dXML.selectSingleNode("/root/Msg/COMPANY").text;							//��������
    document.getElementById("COMPANY_CHARGE_MAN").value = dXML.selectSingleNode("/root/Msg/COMPANY_CHARGE_MAN").text;	//���Ҹ�����
    document.getElementById("VERSION_STATE").value = dXML.selectSingleNode("/root/Msg/VERSION_STATE").text;				//�汾״̬
}

//�����汾��Ϣ 
function popVersionManage(versionId){
    var params = new Array();
    var str = window.showModalDialog("versionManage.jsp?oper=readonly&versionId="+versionId,params,"dialogWidth=1300px;dialogHeight=600px;help=0;scroll=1;status=0;");
}

//����ֻ�����̲鿴��Ϣ 
function showAllInfo(flow_id){
	var sFeatures = "location=0,menubar=0,resizable=1,scrollbars=1,status=0,titlebar=0,toolbar=0";
	window.open('/workshop/form/query_form.html?fullscreen=yes&flowId='+flow_id,"_blank",sFeatures);
}

//���ñ��ⲻ�ɵ��
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
			EMsg("���Ϸ���������Ϊ��!");
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
    	alert("��ѡ����Ӱ��ҵ��ϵͳ!");
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

//�����ʼ�֪ͨ
function msgMailInform(){
	var flowId = oForm.FLOW.FLOW_ID;
	var staffId = oForm.globalVar.STAFF_ID;	//���̷�����
	var tacheId = oForm.FLOW.TCH_ID;
	var notifyType = 3;						//3:���Ͷ��ż��ʼ�
	var oXMLHTTP = new ActiveXObject("Microsoft.XMLHTTP");
	oXMLHTTP.open('get','/FlowQry?FLOW_TASK=NotifyCustService&flowId='+flowId+'&staffIds='+staffId+'&notifyType='+notifyType+'&tacheId='+tacheId+'&actionType=10&remark=FLOW_ALTER_MSG_MAIL',true);
	oXMLHTTP.send();
	if(xmlhttp.status==200){
		alert("���ͳɹ���\n\n��ͨ�����ż��ʼ�֪ͨ�˱�����ķ����ˡ�");
	}
}

//����ʱ�������Դ�������������ܲ�����ʵ�����̵��ӡ��ȴ�����������������Զ�ִ�е�����������ȷ�ϡ�����:
function requirementImplementAutoRun(){
	var flowId = oForm.FLOW.FLOW_ID;
	var url = '/FlowQry?FLOW_TASK=RequirementImplementAutoRun&flowId='+flowId;
	xmlhttp.Open("POST",url,true);
	xmlhttp.send();
	if(xmlhttp.status==200){
//		alert('�Զ�ִ�гɹ�!');
	}else{
		alert("�����Դ�������������ܲ�����ʵ�����̵������Զ�ִ�г���!");
//		return false;
	}
}

function setRelateFlag(){
	var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	xmlhttp.Open("POST",'/servlet/TEST_ALTER_RELEASE_OPT?OperType=48&flow_id='+oForm.FLOW.FLOW_ID, true);
    xmlhttp.send();
    if(isSuccess(xmlhttp)){
    	
    }else{
    	alert("���±�־λ����");
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
      EMsg("��ѡ��һ�����ţ�")
      return false;
   }
   return true;
}

//�ж�id�Ƿ������ids������
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
	if(xmlhttp.readyState==4 && xmlhttp.status==200){		//��ȡ��������Ӧ����
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
// ѡ��"�������ϵͳ":
function selectSystem_belongSystem() {
	var temString = "";
	var temValue = "";
	// ������ѡ��ֵ����������
	var modulCodeArray = new Array();
	var busiClassArray = new Array();
	var regionIdArray = new Array();
	var kpiListArray = new Array();
	var dataTypeArray = new Array();
	var regionArray = new Array();
	var disciplinieArray = new Array();
	var systemArray = new Array();

	systemArray = document.getElementById("BELONG_SYSTEM_ID").value.split(",");
	
//	var bprStr = getStaffBpr();	//��ȡ�û�������רҵ��
//	if(bprStr==""){
//		bprStr = getAllPr();	//���û�δ����רҵ����ȡ����רҵ
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
	params.push("radio");	//��ѡ

	var resultArr = window
			.showModalDialog("/workshop/alarm/addSelectCheck.jsp", params,
					"resizable=yes;dialogWidth=600px;dialogHeight=560px;help=0;scroll=1;status=0;");
	if (resultArr != null) {
		if(resultArr[1].length>1){
			alert("ֻ��ѡ��һ��ϵͳ��");
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

// ѡ��"Ӱ��ϵͳ":
function selectSystem() {
	var temString = "";
	var temValue = "";
	// ������ѡ��ֵ����������
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
	var bprStr = getStaffBpr();	//��ȡ�û�������רҵ��
	if(bprStr==""){
		bprStr = getAllPr();	//���û�δ����רҵ����ȡ����רҵ
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
	params.push("radio");	//��ѡ��
	
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
    if(tchNum=='jtitsm_bg_gd'){//������ ���������ܲ����������ʾ
        var oXMLHTTP = new ActiveXObject("Microsoft.XMLHTTP");
        oXMLHTTP.open("POST","/servlet/RequirementAction?action=101&secondflowId="+oForm.FLOW.FLOW_ID,true);
        oXMLHTTP.send("");
    }
    return true;
}
//ѡ���ţ�
function selectIssueSector() {
	getSelectedOrgComm(document.getElementById("EFFECT_ORG_NAME"),document.getElementById("EFFECT_ORG_ID"));
}

// ��ȡרҵ�б�:
function getAllPr() {
	var str="";
	var sql = 'select STRCAT(bpr_line_cfg_id) text from bpr_line_cfg';
	var resObj = queryData(sql);
	if (resObj && resObj != undefined && resObj.length > 0) {
		str += resObj[0];
	}
	return str;
}

// ѡ��汾
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

//���ݷ�����ѡ����漰ϵͳ����ȡ���̵���
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
		alert ("��ѡ��һ����¼");
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

//���汾״̬��Ϊ����������
function setVersionState(){
       var oXMLHTTP=new ActiveXObject("Microsoft.XMLHTTP");  
       oXMLHTTP.open("POST","/servlet/TEST_ALTER_RELEASE_OPT?OperType=97&version_state=3&version_id="+document.getElementById("VERSION_ID").value,true);    
       oXMLHTTP.send();  
}


//��ȡ��������б�
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

//��������ѡ��ĳһ��
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

//����ҵ��ϵͳID��ȡ��Ӧ��רҵID
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
		EMsg("����ѡ��������ϵͳ��");
		return;
	}	
	var oXMLHTTP=new ActiveXObject("Microsoft.XMLHTTP");	
	oXMLHTTP.open("POST","/servlet/TEST_ALTER_RELEASE_OPT?OperType=108&sysId="+$("#BELONG_SYSTEM_ID").val(),true);	
	oXMLHTTP.send();
	if(isSuccess(oXMLHTTP)){		
		var unionReleaseId=oXMLHTTP.responseXML.selectSingleNode("//UNION_RELEASE_ID").text;
		if(unionReleaseId=="-1"){
			EMsg("��ϵͳ��ϵͳ���Ϊ�գ���ȷ�ϣ�");
			return;
		}
		$("#UNION_RELEASE_ID").val(unionReleaseId);
	}	
}

/**
 * �������ϵͳ�ı���Ӧ�¼�
 */
function systemChange(sysId,type){
	var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	var sql = "";
	if(type == 1){//�׻��ڣ�����ѡ��
		sql = "SELECT T.BUSI_SYSTEM_ID VALUE,T.NAME TEXT FROM CUST_JTITSM_BUSI_SYSTEM T WHERE T.PARENT_SYS_ID in (" +sysId+ ") ORDER BY T.BUSI_SYSTEM_ID";
	}else if(type == 2){//�������ڣ������б�
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
 * �����漰ҵ��ģ��
 */
function loadModels(){
	var modelValues = document.getElementById("MODELS").value;
	var sysIds = document.getElementById("BELONG_SYSTEM_ID").value;
	if(oForm.FLOW.TCH_NUM == 'jtitsm_bg_ss' && sysIds){//���ʵʩ���ڣ��漰ҵ��ϵͳ�ɱ༭
		systemChange(sysIds,1);//���ɸ�ѡ��
		if(modelValues){
			setCheckBoxValueById("SJMLcheckbox",modelValues);//����ѡ�п�
		}
	}else if(modelValues){
		systemChange(modelValues,2);
	}
}

/**
 * �����漰ҵ��ģ�鸴ѡ��
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

//��ȡ�����̵�major��business,�����ж�1)	����ʱ�䡢2)	����Ҫ�����ʱ���Ƿ����
function getMainMajor(){
	var major;
	var business;
	var tag;
	var oXMLHTTP = new ActiveXObject("Microsoft.XMLHTTP");
   	oXMLHTTP.open("get", "/servlet/TEST_ALTER_RELEASE_OPT?OperType=113&flowId="+oForm.FLOW.FLOW_ID, true);
   	oXMLHTTP.send();
   	if (!isSuccess(oXMLHTTP)){
  		MMsg("��ȡרҵʧ�ܣ�");
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
   			alert("������ʱ�䡱����Ϊ��");
   			return false;
   		}
   		if($("#PLAN_ONLINE_TIME").val()==''){
   			alert("������Ҫ�����ʱ�䡱����Ϊ��");
   			return false;
   		}
   	}
   	return true;
}


/**
 * ������Ƿ���Դ�ڡ�ʡ4G�����������ܲ����� ����  �����г����ɷ����ܲ�����
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
 * ��һ���ڴ���ǰִ�к���
 * @param nextTchNum
 */
function onBeforeCreate(nextTchNum){
	var tchNum = oForm.FLOW.TCH_NUM;	

	if(nextTchNum == "jtitsm_bg_gq" && (tchNum == "jtitsm_4g_xtfazd" || tchNum == "jtitsm_4g_ssss" || tchNum == "jtitsm_bg_csfb") && ifFromPro4gOrMarket4g()){//��һ����Ϊ���������
		if($("#IT_TEST_STAFF").val()==''){
   			alert("������IT��ϲ�����Ա������Ϊ��");
   			return false;
   		}
//		if(!getObj("TEST_ATTACHS").value){
//   			alert("���ϴ��������ĵ���");
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
//��ȡ��һ��sequenceֵ
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
			alert("xml�ĵ���ʽ����!");
    	}
    

    }else{
    	alert("���±�־λ����");
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
			alert("xml�ĵ���ʽ����!");
    	}
    

    }else{
    	alert("���±�־λ����");
    }


 
}
function deleteNewPoint(index,id){	

  	var r=confirm("��ȷ���Ƿ�Ҫɾ���ù��ܵ�");
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
  	  		alert("���±�־λ����");
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
		+'<td>����</td>'
		+'<td>����</td>'
		+'<td>������������</td>'
		+'<td><a>����˵��</a></td>'
		+'<td><img src="flowV2/img/edit.jpg" onclick="getnewPoint();"> <img src="flowV2/img/rab.png" onclick="deleteNewPoint();"></td>'
		+'</tr>';
    	 function_point_table_content.insertAdjacentHTML("beforeEnd",iHtml);
    }else{
    	alert("��־λ����");
    }
    document.getElementById("addNewPonit").style.display = "block";   
}
function close1(){
   document.getElementById("addNewPonit").style.display = "none";
}
//��ȡ
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
		    	alert("����ӹ������ܵ�");
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
    	alert("���±�־λ����");
   	}
}
