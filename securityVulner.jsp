 <%@page language="java" pageEncoding="GBK"%>
 <%@ page import="com.bsnnms.bean.common.resource.ResourceLoader"%>
<HTML XMLNS:IE>
<HEAD>
	<META http-equiv="Content-Type" content="text/html; charset=gbk">
	<TITLE>���Ű�ȫ©�����Ĺ�������</TITLE>
	<STYLE type="text/css">
	   @import url(<%=ResourceLoader.buildSrc("/resource/css/flow.css")%>);
	   @import url(<%=ResourceLoader.buildSrc("/resource/css/publicCss.css")%>);
	   @import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/flowForm.css")%>);
		body {
		    font-size:14px;
			margin: 10px 8px 0px 15px;
			background-color: #ECF0F2;
		}
		.xmlTable
		{
			behavior: url(../../../resource/htc/table.htc);
			cursor: hand;
		}
		.labelSpan{
			float:left;
			width:10%;
			font-size:12px;
			color: #125899;
			font-family: "arial", "����";
			line-height:20px;
			font-weight:bold;
			padding:0px 3px 0px 0px;
			margin:3px 0px;
			text-align:right;
			display:none;
		}
	</STYLE>
</head>
<BODY oncontextmenu="return false">
<div id="mask_div" class="domainInfoCss"></div>
<div id="con1" class="conCss">
	<form class='formsPanel_3'>
		<DIV>
			<label for='RES_ORG_ID'>���β���:</label>
			<SELECT id="RES_ORG_ID"></SELECT>
			
			<label for='REQUIRE_FINISH_DATE'>Ҫ�����ʱ��:</label>
			<input type="text" id="REQUIRE_FINISH_DATE" readonly="readonly" 
				onFocus="WdatePicker({isShowClear:true,dateFmt:'yyyy-MM-dd',minDate:new Date(), readOnly:true})"/>
			
			<label for='SERIAL'>����:</label>
			<input type='text' id='SERIAL' readonly="readonly"/>

			
			<label for='FORM_TITLE'>����:</label>
			<input style="width:82%;" type='text' id='FORM_TITLE' />	
			
			
			<label for='CONTENT_DESC'>��������:</label>
			<textarea rows="20" id="CONTENT_DESC"></textarea>
		
		</DIV>
	</form>
	 
				
	<form class='formsPanel_3'>
		<div>
			<label for='ATTACHS'>����:</label>
			<span id="ATTACHS" style="behavior: url(<%=ResourceLoader.buildSrc("/resource/htc/formAttach.htc")%>);
				WIDTH: 82%;float: left; border: 1px solid #94B0CB; background-color: #EFF4FE; " isAllowHistory="true"></span>
		</div>
	</form>
	
</div>	


<!-- ��ȫ�����˴������� -->
<DIV id="CUST_JTITSM_SECURITY_002_DIV" style="display:none;width:100%">
   	<form class='formsPanel_4'>
   		<div class="formsPanel_4_div">			
			<label for='BUSI_SYSTEM_NAMES' style="width:12%;">
				<font style="width:auto;color:#FFAE00;font-size:10px;font-family:'����';margin:0 3px 0 0;">*</font>
				<font onClick="selectSystem(BUSI_SYSTEM_IDS,BUSI_SYSTEM_NAMES)" title="ѡ��ϵͳ" class="fourLabelLink" 
					onMouseOver="this.className='fourLabelLinkOver'" onMouseOut="this.className='fourLabelLink'">ҵ��ϵͳ:</font>							
			</label>
			<input type="text" id="BUSI_SYSTEM_NAMES" style="width:200px;" readonly="readonly"/>
		</div>
	</form> 
</DIV>

<!-- ֪ͨ������ϵ����� -->
<DIV id="CUST_JTITSM_SECURITY_004_DIV" style="display:none;width:100%">
   	<form class='formsPanel_3'>
	   	<div class="formsPanel_3_div">
	   	   	<label id="APPLY_RE_CHECK_DATE_LABEL" style="width:14%;text-align:right;display:none;">����:</label>   		
			<label for='APPLY_RE_CHECK_DATE' style="width:auto;">
				���븴��ʱ��:
			</label>
			<input type="text" id="APPLY_RE_CHECK_DATE" readonly="readonly"
				onFocus="WdatePicker({isShowClear:true,dateFmt:'yyyy-MM-dd',minDate:new Date(), readOnly:true})"/>
		</div>
	</form> 
</DIV>


<!-- ��ȫ���쵯���� -->
<DIV id="CUST_JTITSM_SECURITY_005_DIV"  style="display:none;width:100%">
   	<form class='formsPanel_3'>
	   	<div class="formsPanel_3_div">
	   		<label id="EFFECT_LABEL" style="width:14%;text-align:right;display:none;">����:</label>
			<label for='EFFECT' style="width:auto;">����Ч��:</label>
			<span id="EFFECT"  style="width:30%" onclick="oForm.execFlowUIHook()"></span>
			
			<label for='ACTUAL_FINISH_DATE' style="width:auto;">
				ʵ�����ʱ��:
			</label>
			<input type="text" id="ACTUAL_FINISH_DATE" readonly="readonly"  
				onFocus="WdatePicker({isShowClear:true,dateFmt:'yyyy-MM-dd', readOnly:true})"/>
		
		</div>
	</form> 
</DIV>


<!--�������(�б�ʽ): -->
<div id="flowFlogDiv" style="display:none;">
	<br>
	<div id="showPanel" style="width:96%;margin-left:3%;margin-top:5px;padding-top:3px;border-top:1px dashed #98C8FF;">
		<span style="margin-left:10px;cursor:hand;font-size:13px;" 
			onclick="hideOrShowFlog(document.getElementById('oFlowProcFrame'),document.getElementById('showPanel'))" 
			onMouseOver="this.style.textDecoration='underline'" onMouseOut="this.style.textDecoration='none';">
			<font id="ssLegend" class="flowLegendImgCss">6</font>������̣�</span>
		<span id="chartShow" style="margin-left:40px;cursor:hand;text-Decoration:underline;font-size:13px;color:#0046D5;" 
			onclick="getProc(oForm)" onMouseOver="this.style.color='#FF0000';" onMouseOut="this.style.color='#0046D5';">
			<font style="font-family:Webdings;font-size:18px;">4</font>ͼ�η��չʾ</span>
			
		<iframe src="about:blank" style="width: 100%; height: 100%; border: 0px solid black;overflow-y:none;" 
			frameborder="0" id="oFlowProcFrame"></iframe>
	</div>			
</div>

<div style="display: none">
  	<input type="hidden" id="FLOW_ID" />
	<input type="hidden" id="REQUEST_ID" />
	<input type="hidden" id="BUSI_SYSTEM_IDS" />
	<input type="hidden" id="SUBMIT_STAFF_ID" />
	<input type="hidden" id="SUBMIT_DATE" />
</div>
</BODY>
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/Common.js")%>"></script> 
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/Dialog.js")%>"></script> 
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/Error.js")%>"></script> 
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/ChoiceDialog.js")%>"></script> 
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/jtitsmFormCommon.js")%>"></script>  
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/My97DatePicker/WdatePicker.js")%>"></script> 
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/ewebeditor/eFormEditor.js")%>"></script> 
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/form/nUpload.js")%>"></script>  
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/resource/js/jquery-1.4.2.min.js")%>"></script>  
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/jtitsmFormCommon2.js")%>"></script>  
<script type="text/javascript" src="<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/securityVulner.js")%>"></script>  
</HTML>