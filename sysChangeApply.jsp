<%@page language="java" pageEncoding="GBK"%>
<%@ page import="com.bsnnms.bean.common.resource.ResourceLoader"%>
<HTML XMLNS:IE>
<HEAD>
	<META http-equiv="Content-Type" content="text/html; charset=gbk">
	<TITLE>�Ӱ��������</TITLE>
	<!-- ����-->
	<!-- ��ʽ���� -->
	<link type="text/css" rel="stylesheet" charset="gbk" href='<%=ResourceLoader.buildSrc("/resource/css/publicCss.css")%>'/>
	<link type="text/css" rel="stylesheet" charset="gbk" href='<%=ResourceLoader.buildSrc("/resource/css/redmond/jquery-ui-1.7.2.custom.css")%>'/>
	<link type="text/css" rel="stylesheet" charset="gbk" href='<%=ResourceLoader.buildSrc("/resource/css/default.css")%>'/>

  	<STYLE type="text/css">
	@import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/table.css")%>);
    @import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/PublicHtc.css")%>);
    @import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/default.css")%>);
    @import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/btn.css")%>);
    @import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/PopupMenu.css")%>);
    @import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/page.css")%>);
    @import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/mpc.css")%>);
    @import url(<%=ResourceLoader.buildSrc("/resource/css/flow.css")%>);
    @import url(<%=ResourceLoader.buildSrc("/resource/js/kindEditor/skins/default.css")%>);
	@media all{
		<!-- htc�ؼ����� -->
	    IE\:page{
	    	behavior: url(<%=ResourceLoader.buildSrc("/resource/htc/mpc.htc")%>);
	    }
	}

	body {
	    font-size:14px;
		margin: 10px 8px 0px 15px;
		background-color: #ECF0F2;
	}

</STYLE>
</HEAD>

<BODY oncontextmenu="return false">
<div id="con1" class="conCss">
	<form class='formsPanel_3'>
	    <div>
			<label for='SUBMIT_ORG_NAME'>�����ţ�</label>
			<input type='text' id='SUBMIT_ORG_NAME' readonly="readonly" style="width:18%;"/>
			
			<label for='SUBMIT_STAFF'>�����ˣ�</label>
			<input type='text' id='SUBMIT_STAFF' readonly="readonly" style="width:18%;"/>
	
			<label for='TELPHONE'>��ϵ�绰��</label>
			<input type='text' id='TELPHONE' style="width:18%;"/>
		</div>
		
		<div>
			<label for='CHANGE_SYSTEM'><font onClick="getRelSystem(true,'CHANGE_SYSTEM_ID','CHANGE_SYSTEM','radio')" 
				title="ѡ��ϵͳ" class="labelLink" onMouseOver="this.className='labelLinkOver'" 
				onMouseOut="this.className='labelLink'">�䶯����ϵͳ:</font>
			</label>
			<input type='text' id='CHANGE_SYSTEM' readonly="readonly" style="width:18%;"/>
			
			<label for='CHANGE_SOURCE'>�䶯��Դ��</label>
			<select id='CHANGE_SOURCE' style="width:18%;"></select>
			
			<label for='IMPORTANT'>��Ҫ�ȼ���</label>
			<select id='IMPORTANT' style="width:18%;"></select>
		</div>
		
		<div>
			<label for='BUSINESS_AFFECT'>ҵ��Ӱ��̶ȣ�</label>
			<select id='BUSINESS_AFFECT' style="width:18%;"></select>
			
			<label for='BUSINESS_SYSTEM_AFFECT'><font onClick="getRelSystem(false,'BUSINESS_SYSTEM_AFFECT_ID','BUSINESS_SYSTEM_AFFECT','checkBox')" 
				title="ѡ��ϵͳ" class="labelLink" onMouseOver="this.className='labelLinkOver'" onMouseOut="this.className='labelLink'">��Ӱ��ҵ��ϵͳ:</font>
			</label>
			<input type="text" id='BUSINESS_SYSTEM_AFFECT' style="width:18%;"/>
			
			
			<label for='FINISH_DATE'>Ҫ�����ʱ�䣺</label>
			<input style="width:18%;" class="Wdate" id="FINISH_DATE"
					onFocus="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd',readOnly:true})" readonly="readonly"/>
		</div>
		
		<div>
			<label for='BUSINESS_AFFECT'>�Ƿ�Ӱ�����ݵ��룺</label>
			<span id='IS_AFFECT_IMPORT' style="width:18%;"></span>
			
			<label for='IS_STRUCTURE_CHANGE'>�Ƿ����ݿ�ṹ�����仯��</label>
			<span id='IS_STRUCTURE_CHANGE' style="width:18%;"></span>
			
			<label for='HEADER_CONFIRM'>�����̸�����ȷ�ϣ�</label>
			<span id='HEADER_CONFIRM' style="width:18%;"></span>
		</div>
		
	   <div>
			<label for='TITLE'>������⣺</label>
			<input style="width:82%;height:20px;" type='text' id='TITLE'/>
	   </div>

	</form>
	
	<div class="formsPanel_3_div">
		<label for='CHANGE_DESC' class="divLabel" >�䶯������</label>
		<span class="divSpan"><textarea id='CHANGE_DESC' style="float:left;WIDTH:100%;height:180px;"></textarea></span>
	</div>
	
	<form class='formsPanel_3'>
         <label for='ATTACH'>������Ϣ��</label>
         <span id="ATTACH" style="WIDTH:82%;float:left;border:1px solid #94B0CB;background-color:#EFF4FE;
         	behavior:url(<%=ResourceLoader.buildSrc("/resource/htc/formAttach.htc")%>);"></span>
    </form>
    

</div>

<!--�������(�б�ʽ): -->
<div id="flowFlogDiv" style="display:none;">
	<br>
	<div id="showPanel" style="width:97%;margin-left:3%;margin-top:5px;padding-top:3px;border-top:1px dashed #98C8FF;float:right">
		<span style="margin-left:10px;cursor:hand;font-size:13px;" 
			onClick="hideOrShowFlog(document.getElementById('oFlowProcFrame'),document.getElementById('showPanel'))" 
			onMouseOver="this.style.textDecoration='underline'" onMouseOut="this.style.textDecoration='none';">
			<font id="ssLegend" class="flowLegendImgCss">6</font>������̣�</span>
		<span id="chartShow" style="margin-left:40px;cursor:hand;text-Decoration:underline;font-size:13px;color:#0046D5;" 
			onClick="getProc(oForm)" onMouseOver="this.style.color='#FF0000';" onMouseOut="this.style.color='#0046D5';">
			<font style="font-family:Webdings;font-size:18px;">4</font>ͼ�η��չʾ</span>
			
		<iframe src="about:blank" style="width: 95%; height: 100%; border: 0px solid black;overflow-y:none;" 
			frameborder="0" id="oFlowProcFrame"></iframe>
	</div>			
</div>

<div style="display: none">
   	<input type="hidden" id="REQUEST_ID" />
	<input type="hidden" id="FLOW_ID" />
	<input type="hidden" id="SUBMIT_STAFF_ID" />
	<input type="hidden" id="SUBMIT_ORG_ID" />
	<input type="hidden" id="EMAIL" />
	<input type="hidden" id="SUBMIT_TIME" />
	<input type="hidden" id="SERIAL" />
	<input type="hidden" id="CHANGE_SYSTEM_ID" />
	<input type="hidden" id="BUSINESS_SYSTEM_AFFECT_ID" />
</div>
</BODY>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/resource/js/encode/aes.js")%>'></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/resource/js/encode/mode-ecb.js")%>'></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/resource/js/Common.js")%>'></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/resource/js/Dialog.js")%>'></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/resource/js/Error.js")%>'></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/resource/js/stringUtil.js")%>'></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/resource/js/ChoiceDialog.js")%>'></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/resource/js/My97DatePicker/WdatePicker.js")%>'></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/resource/js/meizzDate_jtitsm.js")%>'></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/resource/js/kindEditor/kindeditor.js")%>' charset="utf-8"></script>
<SCRIPT type="text/javascript" src='<%=ResourceLoader.buildSrc("/resource/js/form/formFieldTurn.js")%>'></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/resource/js/jquery-1.4.2.min.js")%>'></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/commonUtil.js")%>'></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/workshop/form/formFile/form_commons.js")%>'></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/jtitsmFormCommon.js")%>'></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/form_commons.js")%>'></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/sysChangeApply.js")%>'></script>
</HTML>
