/**
 * [onFormReady ������ں���]
 * @param  {[type]} oForm [���̱�����, ����ע��]
 * @return {[type]}       [description]
 */
var onFormReady = function(oForm) {
    this.oForm = oForm;
    this.formContext = oForm;
    submitInfoUtil.init('APPLICANT','APPLY_DEPARTMENT','APPLICANT_MOBILE');//ҳ��ͷ����������Ϣ�༭��
    getProc(oForm); //�������
    
    //�жϳ��������ǲ��ǡ���ѵ����������ʾ����ѵ����div��
	var buzType=oForm.TABLE.CUST_JTITSM_BIZ_APP.BIZ_TYPE.DEFAULT_VALUE;
	if(buzType==3){
		$("#training_application_div").css("display","block");
	}
	//��ʼ����ѡ��ť
	viewMaker.init();
	//�ж�����ѡ����Ƿ��ѡ
	selectTimeList();
	
	//�û�ȷ�ϻ��ڣ��Ƿ�׷��˵����Ĭ��ѡ�񡰷�
	var add_instrct=oForm.TABLE.CUST_JTITSM_BIZ_APP.ADDITIONAL_INSTRCT.DEFAULT_VALUE;
	var user_confir=oForm.TABLE.CUST_JTITSM_BIZ_APP.USER_CONFIRMATION.DEFAULT_VALUE;
	if(add_instrct==""){
		$("input[name='ADDITIONAL_INSTRCT'][value='2']").attr("checked",true);
	}
	
	var instrct_input=$("#ADIT_INSTRCT_INPUT").val();
	//���ٴ��ߵ� �û�ȷ�ϻ��� ��ʱ��������д���˵�����Ƿ�׷��˵����ť����ѡ
	if(user_confir==2 && !(instrct_input=="")){
		$("#ADDITIONAL_INSTRCT").attr("disabled","true");
	}
	
	//�û�ȷ�ϻ��ڣ����Ƿ���ʾ���ص�׷��˵�������
	checkRadioValue();
	
	//����׷��˵��������£��ڱ���ʾ׷��˵�������ݣ����˻����ʱ���û������ڱ��޸�׷������,��������Ϊֻ����
	var instrct_input = oForm.TABLE.CUST_JTITSM_BIZ_APP.ADIT_INSTRCT_INPUT.DEFAULT_VALUE;
	if(!instrct_input==""){
		$("#ADIT_INSTRCT").val(instrct_input);
		$("#add_instrct_div").css('display',"block");
	}
	if(oForm.FLOW.TCH_NUM=="BUSINESS_APPLICATION_03"){
		$("#ADIT_INSTRCT").removeAttr("readonly");
	}else{
		$("#ADIT_INSTRCT").attr("readonly","readonly");
	}
	
};

//�ύǰ���жϵķ���
function onClickBefore(){
	//�ύǰ�жϣ��Ƿ�����ѵ���룬û�еĻ�������������
	if(!($("#BIZ_TYPE_SPAN_3").attr('class')=="overSelLabCss2")){
		$("#TRN_BEGIN_TIME").val("");
		$("#TRN_END_TIME").val("");
		$("#TRN_PLACE").val("");
		$("#TRN_COST").val("");
		$("#TRN_PERSON").val("");
		$("#TRAVEL_CONTENT").val("");
	}
	
	//���ҳ��� ׷��˵�����޸ģ������
	var instrct_input = oForm.TABLE.CUST_JTITSM_BIZ_APP.ADIT_INSTRCT_INPUT.DEFAULT_VALUE;
	var add_instrct = $("#ADIT_INSTRCT").val();
	if(!(add_instrct==instrct_input)){
		$("#ADIT_INSTRCT_INPUT").val(add_instrct);
	}
	
	if($("#BIZ_TYPE_SPAN_3").attr('class')=="overSelLabCss2" && checkBizTypeDiv()==false){
		return false;
	}else if(checkTriTime()==false){
		return false;
	}else{
		return true;
	}
}

//�ж�ҳ��ʱ��Ĺ�ϵ
function checkTriTime(){
	var beginTime = $("#BIZ_BEGIN_TIME").val();		//���ʼʱ��
	var endTime = $("#BIZ_END_TIME").val();			//�������ʱ��
	var triBeginTime = $("#TRN_BEGIN_TIME").val();	//��ѵ��ʼʱ��
	var triEndTime = $("#TRN_END_TIME").val();		//��ѵ����ʱ��
	
	var d1=new Date(beginTime.replace(/\-/g,'/'));
 	var d2=new Date(endTime.replace(/\-/g,'/'));
	var d3=new Date(triBeginTime.replace(/\-/g,'/'));
 	var d4=new Date(triEndTime.replace(/\-/g,'/'));
 	if(d1>d2){
 		MMsg("���ʼʱ�䲻�ܴ��ڳ������ʱ�䣡");
 		return false;
 	}else if(d3>d4){
 		MMsg("��ѵ��ʼʱ�䲻�ܴ�����ѵ����ʱ�䣡");
 		return false;
 	}
}

//�ж�����ѡ����Ƿ��ѡ
function selectTimeList(){
	if(oForm.TABLE.CUST_JTITSM_BIZ_APP.BIZ_BEGIN_TIME.IS_READONLY=='T'){
		getObj('BIZ_BEGIN_TIME').disabled='disabled';
        $("#BIZ_BEGIN_TIME").attr("style","background-color:#ffffff");
    }
    if(oForm.TABLE.CUST_JTITSM_BIZ_APP.BIZ_END_TIME.IS_READONLY=='T'){
		getObj('BIZ_END_TIME').disabled='disabled';
        $("#BIZ_END_TIME").attr("style","background-color:#ffffff");
    }
    if(oForm.TABLE.CUST_JTITSM_BIZ_APP.TRN_BEGIN_TIME.IS_READONLY=='T'){
		getObj('TRN_BEGIN_TIME').disabled='disabled';
        $("#TRN_BEGIN_TIME").attr("style","background-color:#ffffff");
    }
    if(oForm.TABLE.CUST_JTITSM_BIZ_APP.TRN_END_TIME.IS_READONLY=='T'){
		getObj('TRN_END_TIME').disabled='disabled';
        $("#TRN_END_TIME").attr("style","background-color:#ffffff");
    }
}

//��ʼ��ҳ��ĵ�ѡ��ť
viewMaker={
	init:function(){
		this.bizTypeInit();
		this.transitVehicleInit();
		this.goBookingInit();
		this.returnTrafficInit();
		this.returnBookingInit();
		this.reservationModeInit();
	},
	
    //��������
    bizTypeInit:function(){
    	createLabelListNew("BIZ_TYPE_SPAN", "BIZ_TYPE", FlowUtil
                    .getTableFieldProperty("BIZ_TYPE", "DEFAULT_VALUE"), null,
                    null, null, null, 'oper.onBizTypeChange()',
                    'oper.onBizTypeChangeCfg()');
    },
    //ȥ�̽�ͨ����
    transitVehicleInit:function(){
    	createLabelListNew("TRANSIT_VEHICLE_SPAN", "TRANSIT_VEHICLE", FlowUtil
                    .getTableFieldProperty("TRANSIT_VEHICLE", "DEFAULT_VALUE"), null,
                    null, null, null, 'oper.transitVehicleInit()',
                    'oper.onTransitVehicleCfg()');
    },
    //ȥ�̶�Ʊ��ʽ
    goBookingInit:function(){
    	createLabelListNew("GO_BOOKING_SPAN", "GO_BOOKING", FlowUtil
                    .getTableFieldProperty("GO_BOOKING", "DEFAULT_VALUE"), null,
                    null, null, null, 'oper.goBookingInit()',
                    'oper.onGoBookingCfg()');
    },
    //���̽�ͨ����
    returnTrafficInit:function(){
    	createLabelListNew("RETURN_TRAFFIC_SPAN", "RETURN_TRAFFIC", FlowUtil
                    .getTableFieldProperty("RETURN_TRAFFIC", "DEFAULT_VALUE"), null,
                    null, null, null, 'oper.returnTrafficInit()',
                    'oper.returnTrafficCfg()');
    },
    //���̶�Ʊ��ʽ
    returnBookingInit:function(){
    	createLabelListNew("RETURN_BOOKING_SPAN", "RETURN_BOOKING", FlowUtil
                    .getTableFieldProperty("RETURN_BOOKING", "DEFAULT_VALUE"), null,
                    null, null, null, 'oper.returnBookingInit()',
                    'oper.returnBookingCfg()');
    },
    //������ʽ
    reservationModeInit:function(){
    	createLabelListNew("RESERVATION_MODE_SPAN", "RESERVATION_MODE", FlowUtil
                    .getTableFieldProperty("RESERVATION_MODE", "DEFAULT_VALUE"), null,
                    null, null, null, 'oper.reservationModeInit()',
                    'oper.reservationModeCfg()');
    }
};

var oper={
    //��������
	onBizTypeChange:function(){
	 	setRadioValue('BIZ_TYPE',ElementUtil.get('BIZ_TYPE_SPAN').value || '');  
	 	checkBizType();
	},
	onBizTypeChangeCfg:function(){
	     if(getObj('BIZ_TYPE').disabled){
	         return false;
	     }
	     return true;
    },
	//ȥ�̽�ͨ����
	transitVehicleInit:function(){
		setRadioValue('TRANSIT_VEHICLE',ElementUtil.get('TRANSIT_VEHICLE_SPAN').value || ''); 
	},
	onTransitVehicleCfg:function(){
	     if(getObj('TRANSIT_VEHICLE').disabled){
	         return false;
	     }
	     return true;
    },
	//ȥ�̶�Ʊ��ʽ
	goBookingInit:function(){
		setRadioValue('GO_BOOKING',ElementUtil.get('GO_BOOKING_SPAN').value || ''); 
	},
	onGoBookingCfg:function(){
	     if(getObj('GO_BOOKING').disabled){
	         return false;
	     }
	     return true;
    },
    //���̽�ͨ����
	returnTrafficInit:function(){
		setRadioValue('RETURN_TRAFFIC',ElementUtil.get('RETURN_TRAFFIC_SPAN').value || ''); 
	},
	returnTrafficCfg:function(){
	     if(getObj('RETURN_TRAFFIC').disabled){
	         return false;
	     }
	     return true;
    },
    //���̶�Ʊ��ʽ
	returnBookingInit:function(){
		setRadioValue('RETURN_BOOKING',ElementUtil.get('RETURN_BOOKING_SPAN').value || ''); 
	},
	returnBookingCfg:function(){
	     if(getObj('RETURN_BOOKING').disabled){
	         return false;
	     }
	     return true;
    },
    //������ʽ
	reservationModeInit:function(){
		setRadioValue('RESERVATION_MODE',ElementUtil.get('RESERVATION_MODE_SPAN').value || ''); 
	},
	reservationModeCfg:function(){
	     if(getObj('RESERVATION_MODE').disabled){
	         return false;
	     }
	     return true;
    },
	onChangeCfg: function() {
    	return true;
    }
};

//�������͵ĸı��¼�
//����������Ϊ����ѵ��ʱ����ʾ���ص�"��ѵ����div"
function checkBizType(){
	if($("#BIZ_TYPE_SPAN_3").attr('class')=="overSelLabCss2"){
		$("#training_application_div").css("display","block");
	}else{
		$("#training_application_div").css("display","none");
	}
}

//�����ص�"��ѵ����div"��ʾ�󣬶Ա���������ж�
function checkBizTypeDiv(){
	if($("#TRN_BEGIN_TIME").val()==""){
		EMsg("��ѵ��ʼʱ�䲻����Ϊ�գ�");
		return false;
	}else if($("#TRN_END_TIME").val()==""){
		EMsg("��ѵ����ʱ�䲻����Ϊ�գ�");
		return false;
	}else if($("#TRN_PLACE").val()==""){
		EMsg("��ѵ�ص㲻����Ϊ�գ�");
		return false;
	}else if($("#TRN_COST").val()==""){
		EMsg("��ѵ���ò�����Ϊ�գ�");
		return false;
	}else if($("#TRN_PERSON").val()==""){
		EMsg("��ѵ��Ա������Ϊ�գ�");
		return false;
	}else if($("#TRAVEL_CONTENT").val()==""){
		EMsg("��ѵ���ݲ�����Ϊ�գ�");
		return false;
	}else{
		return true;
	}
}

//����pdf�ļ�
var downLoadReady="";
function exportPdf(){
	parent.document.frames("fraToolBar").toOutPdf(false);
	downLoadReady=1;
}

//�û�ȷ�ϻ��ڣ����ڴ�����ִ�е��жϺ��������ݿ����ã�
function checkFormReq(nextTchNum,action){
	var currTchNum = oForm.FLOW.TCH_NUM;//��ǰ����
	var nextTchNum = nextTchNum;//��һ����
	
	//�ж��Ƿ�ڶ����ߵ��û�ȷ�ϻ���
	var user_confirmation=$("#USER_CONFIRMATION").val();
	var tempValue=$('input:radio[name="ADDITIONAL_INSTRCT"]:checked').val();
	//���û�ѡ�С��ǡ�ʱ����ʾ��׷��˵�������ı���
	if(tempValue==1){
		$("#ADIT_INSTRCT_DIV").css('display',"block");
	}else{
		$("#ADIT_INSTRCT_DIV").css('display',"none");
	}
	
	//���û�ѡ����ӡ�׷��˵������ʱ���ж�׷��˵�����Ƿ�����дֵ
	var adit_instrct=$("#ADIT_INSTRCT_INPUT").val();
	if( tempValue==1 && adit_instrct==""){
		MMsg("����˵�����������Ϊ�գ�");
		return false;
	}
		
	//���û�ѡ��"׷��˵��"��ʱ����һ����·��ֻ����ǰ������������ˡ�(���������ٴλص����û�ȷ�ϡ�����)
	if( tempValue==1 && nextTchNum=='BUSINESS_APPLICATION_08' && !(user_confirmation ==2) ){
		MMsg("ѡ�С�׷��˵������ֻ��ǰ�����������������ڣ�ֱ���´����ߵ�������ڣ����ܿ�����");
		return false;
	}
	
	//��ѡ�񿢹���ʱ������������ʱ����ڵ�ǰʱ��ʱ���������������Ѿ���ӹ�׷��˵��
	var currentTime= getCurrentTime();//��ȡ��ǰ��ʱ��
	var endTime=$("#BIZ_END_TIME").val();//��ȡ�������ʱ��
	var d1=new Date(currentTime.replace(/\-/g,'/'));
 	var d2=new Date(endTime.replace(/\-/g,'/'));

    if( (d1 < d2) && !(user_confirmation==2) && nextTchNum=='BUSINESS_APPLICATION_08'){
   		MMsg("��ǰʱ��С�ڳ������ʱ�䣬������������ȥ���׷��˵�����쵼������ɿ�����");
   		return false;
    }
    
    //����ǰ����ʾ�û���������pdf������û���ز��ܿ���
	if(nextTchNum=='BUSINESS_APPLICATION_08' &&��!downLoadReady==1){
		MMsg("��������س������뵥pdf,���ڲ��ܿ�����");
		return false;
	}
	
	//�������ж������һ�����ߵ�����������ʱ�򣬱��渽�������ڸ����С�
	if(nextTchNum=='BUSINESS_APPLICATION_08'){
		parent.document.frames("fraToolBar").toOutPdf(true);
	}
	
	//�����ڵ���û�ȷ�ϡ���ʱ�򣬶����ؿ���и�ֵ�����ں������ж�ʹ��
	if(nextTchNum=='BUSINESS_APPLICATION_02'){
		$("#USER_CONFIRMATION").val(2);
	}
	
	return true;
}

//����ȷ�ϻ��ڣ� �ж��û�ѡ�еġ��Ƿ�׷��˵������ֵ
function checkRadioValue(){
	var tempValue=$('input:radio[name="ADDITIONAL_INSTRCT"]:checked').val();
	if(tempValue==1){
		$("#ADIT_INSTRCT_DIV").css('display',"block");
		//��׷��˵��ѡ�ǵ�ʱ��pdfButton2����ʾ��pdfButton2ֻ��ʾ�ڷ������¡�
		$("#pdfButton2").css("display","none");
	}else{
		$("#ADIT_INSTRCT_DIV").css('display',"none");
	}
	
	//�״λ��ڵ�������ȷ�ϻ��ڵ�ʱ��׷��˵��ѡ���ǵ�ʱ�򣬲���ʾ���ذ�ť
	var adit_instrct=oForm.TABLE.CUST_JTITSM_BIZ_APP.USER_CONFIRMATION.DEFAULT_VALUE;
	if( (tempValue==1 && adit_instrct==2)){
		$("#pdfButton").css("display","block");
	}else{
		$("#pdfButton").css("display","none");
	}
	
	//�״ε������˻��ڣ����׷��˵��ʱ�����������ļ���ť
	var user_confirmation=$("#USER_CONFIRMATION").val();
	var currentTime= getCurrentTime();//��ȡ��ǰ��ʱ��
	var endTime=$("#BIZ_END_TIME").val();//��ȡ�������ʱ��
	var d1=new Date(currentTime.replace(/\-/g,'/'));
 	var d2=new Date(endTime.replace(/\-/g,'/'));
	if(d1<d2 && !(user_confirmation==2)){
		$("#pdfButton").css("display","none");
	}else if(d1>d2 && !(user_confirmation==2) && tempValue==1){
		$("#pdfButton").css("display","none");
	}else{
		$("#pdfButton").css("display","block");
	}
	
	//�״ε��û�ȷ�ϻ��ڣ���������δ����׷��˵��ѡ����ʱ����ʾ�������ذ�ť��  pdfButton2
	if(d1<d2 && !(user_confirmation==2) && tempValue==2){ 
	    $("#pdfButton").css("display","none");
		$("#pdfButton2").css("display","block");
	}
	
	var instrct_input=$("#ADIT_INSTRCT_INPUT").val();
	//�������ٴε�������ȷ�ϻ���ʱ�������˵�����ϴ�����дֵ��׷��˵���򲻿��޸�ֻ��չʾ
	var user_confir=$("#USER_CONFIRMATION").val();
	if( tempValue==1 && user_confir==2 && !(instrct_input=="")){
		$("#ADIT_INSTRCT_INPUT").attr("readonly","readonly");
	}else{
		$("#ADIT_INSTRCT_INPUT").removeAttr("readonly");
	}
}

//�״ε��û�ȷ�ϻ��ڣ���������δ����׷��˵��ѡ����ʱ����ʾ��������
function notDownload(){
	MMsg("��ǰʱ��С�ڳ������ʱ�䣬������������ȥ���׷��˵�����쵼������ɿ�����");
}

//js��ȡ��ǰ��ʱ��
function getCurrentTime(){
	var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var strMinutes = date.getMinutes();
    var strSeconds = date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (strMinutes >= 0 && strMinutes <= 9) {
        strMinutes = "0" + strMinutes;
    }
    if (strSeconds >= 0 && strSeconds <= 9) {
        strSeconds = "0" + strSeconds;
    }
   
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + strMinutes
            + seperator2 + strSeconds;
    return currentdate;
}