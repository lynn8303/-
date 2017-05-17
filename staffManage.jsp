<%@page language="java" pageEncoding="GBK"%>
<%@ page import="com.bsnnms.bean.common.resource.ResourceLoader"%>
<HTML XMLNS:IE>
<HEAD>
	<META http-equiv="Content-Type" content="text/html; charset=gbk">
	<TITLE>员工管理流程表单</TITLE>
	<?IMPORT namespace="IE" implementation="<%=ResourceLoader.buildSrc("/resource/htc/dbTree.htc")%>'>

	<link href='<%=ResourceLoader.buildSrc("/resource/css/publicCss.css")%>' type="text/css" rel="stylesheet" charset="gbk"/>
	<link href='<%=ResourceLoader.buildSrc("/resource/css/jquery.autocomplete.css")%>' type="text/css" rel="stylesheet" charset="gbk"/>
	<link href='<%=ResourceLoader.buildSrc("/resource/css/redmond/jquery-ui-1.7.2.custom.css")%>' type="text/css" rel="stylesheet" charset="gbk"/>
	
	<link href='<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/css/staffManage.css")%>' type="text/css" rel="stylesheet" charset="gbk"/>
	<?IMPORT namespace="IE" implementation='<%=ResourceLoader.buildSrc("/resource/htc/dbTree.htc")%>' >
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
		IE\:tree{
			behavior: url(<%=ResourceLoader.buildSrc("/resource/htc/tree.htc")%>);
		}
	}		
</STYLE>
</head>
<BODY oncontextmenu="return false">
<div id="con1" class="conCss">
	<div id='contentStart'></div>
	<form class='formsPanel_3'>
		<div>
			<label for='FLOW_TYPE'>流程类型:</label>
			<select id='FLOW_TYPE' onChange="flowTypeChange(true)" style="width:18%;"></select>
			
			<label for='TITLE'>流程标题:</label>
			<input style="width:50%;height:20px;padding:0px;margin:3px 0px;" type='text' id='TITLE' />
		</div>
		
		<div>
			<label for='STAFF_NAME'>员工姓名:</label>
			<input type="text" id="STAFF_NAME" style="width:18%;"/>
			<label for='STAFF_ORG_ID'>员工部门:</label>
			
			<span id = "treeSpan" style="width:50%;">
				<IE:dbTree id="STAFF_ORG_ID" treeHeight="200" cfg="jtitsm_org" isReParentText="true" width = "100%"/>
			</span>
		</div>
		
		<div>
			<label for='STAFF_MOBILE'>员工手机号码:</label>
			<input type="text" id="STAFF_MOBILE" style="width:18%;"/>
			
			<label for='STAFF_TEL'>员工电话号码:</label>
			<input type="text" id="STAFF_TEL" style="width:18%;"/>
			
			<label for='PRORITY'>优先级:</label>
			<select id='PRORITY' style="width:18%;"></select>
		</div>
		
		<div>
			<label for='SUBMIT_STAFF_NAME'>发起人:</label>
			<input type="text" id="SUBMIT_STAFF_NAME" style="width:18%;" readonly/>
			
			<label for='SUBMIT_ORG_NAME'>发起部门:</label>
			<input type="text" id="SUBMIT_ORG_NAME" style="width:18%;" readonly/>
			
			<label for='TELPHONE'>联系电话:</label>
			<input type="text" id="TELPHONE" style="width:18%;" />
		</div>
		 
	</form>
	
	<div class="formsPanel_3_div">
		<label for='CONTENT_DESC' class="divLabel">内容描述:</label>
		<span class="divSpan" style="width: 82%;"><textarea id='CONTENT_DESC' rows="18" style="float:left;WIDTH:100%;"></textarea></span>
	</div>
	
	<form class='formsPanel_3'>		
		 <div>
			<label for='ATTACH'>附件:</label>
			<span id="ATTACH" style="behavior: url(<%=ResourceLoader.buildSrc("/resource/htc/formAttach.htc")%>);WIDTH: 82%; 
				float: left; border: 1px solid #94B0CB; background-color: #EFF4FE; " isAllowHistory="true"></span>
		</div>	
	</form>

	<!-- 统一用户管理  JTITSM_YGGL_02-->
	<div id="DIV_JTITSM_YGGL_02" class="conCss" style="display:none;">
		<fieldset id='JTITSM_YGGL_02_FIELDSET' class="fieldsetCss" align='center'
			style="width:92%;margin-left:0%;margin-top:20px;padding:5px 0 0 0px;border:0px;border-top:1px dashed #98C8FF;">
			<legend>
				统一门户管理：
			</legend>
		</fieldset>
		<form class="formsPanel_3">
			<div>
				<label for='PLATFORM_OPER'>统一用户管理平台操作:</label>
				<select id='PLATFORM_OPER' style="width:18%;"></select>
				
				<label for='USER_NAME'>用户名:</label>
				<input type="text" id="USER_NAME" style="width:18%;"/>
				
				<label for='STAFF_EMAIL'>电子邮件:</label>
				<input type="text" id="STAFF_EMAIL" style="width:18%;"/>
			</div>
		</form>
	</div>

	<!-- 资产维护  JTITSM_YGGL_03-->
	<div id="DIV_JTITSM_YGGL_03" class="conCss" style='display:none'>
		<fieldset id='JTITSM_YGGL_03_FIELDSET' class="fieldsetCss" align='center'
			style="width:92%;margin-left:0%;margin-top:20px;padding:5px 0 0 0px;border:0px;border-top:1px dashed #98C8FF;">
			<legend>
				资产维护：
			</legend>
		</fieldset>
		<form class="formsPanel_3">
			<label for='PC_OPER'>电脑分配回收:</label>
			<select id='PC_OPER' onchange = "onPcOperChange();" style="width:18%;"></select>
			
			<label for='PC_VERSION'>
				<font onClick="onPcOperChange()" title="查找设备" class="labelLink" 
					onMouseOver="this.className='labelLinkOver'" onMouseOut="this.className='labelLink'">PC型号:</font>
			</label>
			<input type="text" id="PC_VERSION" style="width:18%;"/>
			
			<label for='PC_SERIAL'>
				<font onClick="onPcOperChange()" title="查找设备" class="labelLink" 
					onMouseOver="this.className='labelLinkOver'" onMouseOut="this.className='labelLink'">PC序列号:</font>
			</label>
			<input type="text" id="PC_SERIAL" style="width:18%;"/>
			
			<label for='IP_OPER'>IP分配回收:</label>
			<select id='IP_OPER' style="width:18%;"></select>
			
			<label for='IP_ADDRESS'>IP地址:</label>
			<input type="text" id="IP_ADDRESS" style="width:18%;"/>
		</form>
	</div>
	
	<!-- OA系统维护  JTITSM_YGGL_06-->
	<div id="DIV_JTITSM_YGGL_06" class="conCss" style='display:none'>
		<fieldset id='JTITSM_YGGL_06_FIELDSET' class="fieldsetCss" align='center'
			style="width:92%;margin-left:0%;margin-top:20px;padding:5px 0 0 0px;border:0px;border-top:1px dashed #98C8FF;">
			<legend>
				OA系统维护：
			</legend>
		</fieldset>
		<form class="formsPanel_3">
			<label for='RIGHT_OPER'>OA权限方面操作:</label>
			<select id='RIGHT_OPER' style="width:18%;"></select>
			
			<label for='RIGHT_DESC'>OA权限调整说明:</label>
			<input type="text" id="RIGHT_DESC" style="width:50%;"/>
		</form>
		
	</div>
	
	<!-- 门系统系统维护  JTITSM_YGGL_07-->
	<div id="DIV_JTITSM_YGGL_07" class="conCss" style='display:none'>
		<fieldset id='JTITSM_YGGL_07_FIELDSET' class="fieldsetCss" align='center'
			style="width:92%;margin-left:0%;margin-top:20px;padding:5px 0 0 0px;border:0px;border-top:1px dashed #98C8FF;">
			<legend>
				门户系统维护：
			</legend>
		</fieldset>
		<form class="formsPanel_3">
			<label for='SYSTEM_OPER'>门户系统方面操作:</label>
			<select id='SYSTEM_OPER' style="width:18%;"></select>
			
			<label for='IS_TRIM'>是否进行调整:</label>
			<span id='IS_TRIM' style="width:18%;"></span>
		</form>
	</div>

	<div id='assetSelDiv' style='display:none; z-index: 12001; overflow:true; background-color:#ffffff ;text-align:left; 
		position:absolute;padding:0;border:1px solid #4068AA;width:760;height:430;overflow:scroll;'>
		<div style="background-color:#99CCFF;width:100%;padding:1%;">
			<span style="font-size:14px;text-align:left;float:left;padding-left:2px;padding-top:2px;color:#ff0000;"><b>选择对应的设备</b></span>
			<span style="font-size:14px;cursor: hand;padding-left:3px;padding-top:2px;padding-right:1px;text-align:right;float:right;"
				class = "required" onmouseover="this.className='itemOverCss'" onmouseout="this.className='required'"
				onclick="document.getElementById('assetSelDiv').style.display = 'none'" title="关闭"><b>×</b>
			</span>
		</div>
		<br>
		
		<div style="text-align:left;float:left;padding-left:15px;width:100%;">
				<label class="label_1">型号:</label>
				<input type="text" id="VERSION" style="width:19%;"/>
				
				<label class="label_1" style="margin-left:10px;">序列号:</label>
				<input type="text" id="SERIAL" style="width:19%;"/>
				
				<label class="label_1" style="margin-left:10px;">入库时间:</label>
				<input type="text" id="TIME" onFocus="WdatePicker({isShowClear:true,dateFmt:'yyyy-MM-dd', readOnly:true})" style="width:19%;" readonly/>
				
				<span style="font-size:12px;width:auto;margin-bottom:3px;margin-left:20px;" class="flatBut" 
					onMouseOver="this.className='flatButOver'" onMouseDown="this.className='flatButDown'" 
					onMouseOut="this.className='flatBut'" onclick="searchAssetList()" />
					&nbsp;&nbsp;&nbsp;查&nbsp;&nbsp;询&nbsp;&nbsp;&nbsp;</span>
		</div>
		
		<div style="font-size:14px;text-align:left;float:left;padding: 15px 10px 0px 10px; width:100%;height:80%">
   			<div align='center'
		    	class="xmlTable" 
				imgPath='../../../resource/image/'
				oDataHead='assetListHead'
				isPage="true"
				id="assetListData"
				pagesize="10"					
				pageindex="10">
			</div>				    
			<!-- 数据列表表头 -->
		    <table id="assetListHead" style="width:95%;display:none;">
		    	<tr>								           
	               <TD class="form_title">选择</TD>
	               <TD class="form_title">型号</TD>
	               <TD class="form_title">序列号</TD>			               
	               <TD class="form_title">CPU</TD>
	               <TD class="form_title">内存（G）</TD>
	               <TD class="form_title">硬盘（G）</TD>		
	               <TD class="form_title">入库时间</TD>									              
				</tr>
			</table>
		</div>
		
		<div style="width:100%;height:40px;background-color:#99CCFF;TEXT-ALIGN: center;margin-top:5px;">
			<span style="float:center;font-size:12px;width:auto;margin-top:10px;" class="flatBut" 
				onMouseOver="this.className='flatButOver'" onMouseDown="this.className='flatButDown'" 
				onMouseOut="this.className='flatBut'" onclick="selAsset(true)" />
				&nbsp;&nbsp;&nbsp;确&nbsp;&nbsp;定&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;
			<span style="float:center;font-size:12px;width:auto;" class="flatBut" 
				onMouseOver="this.className='flatButOver'" onMouseDown="this.className='flatButDown'" 
				onMouseOut="this.className='flatBut'" onclick="selAsset(false)" />
				&nbsp;&nbsp;&nbsp;取&nbsp;&nbsp;消&nbsp;&nbsp;&nbsp;</span>
		</div>
	</div>
	
	<!--处理过程(列表方式): -->
	<div id="flowFlogDiv" style="display:none;">
		<br>
		<hr style="width:92%;border:1px dashed #98C8FF;">
		<div id="showPanel" style="width:97%;margin-left:3%;float:right">
			<span style="margin-left:10px;cursor:hand;font-size:13px;" 
				onclick="hideOrShowFlog(document.getElementById('oFlowProcFrame'),document.getElementById('showPanel'))" 
				onMouseOver="this.style.textDecoration='underline'" onMouseOut="this.style.textDecoration='none';">
				<font id="ssLegend" class="flowLegendImgCss">6</font>处理过程：</span>
			<span id="chartShow" style="margin-left:40px;cursor:hand;text-Decoration:underline;font-size:13px;color:#0046D5;" 
				onclick="getProc(oForm)" onMouseOver="this.style.color='#FF0000';" onMouseOut="this.style.color='#0046D5';">
				<font style="font-family:Webdings;font-size:18px;">4</font>图形风格展示</span>
				
			<iframe src="about:blank" style="width: 95%; height: 100%; border: 0px solid black;overflow-y:none;" frameborder="0" id="oFlowProcFrame"></iframe>
		</div>			
	</div>
		
	<div style="display: none">
		<input type="hidden" id="REQUEST_ID" />
		<input type="hidden"  id="FLOW_ID">
		<input type="hidden"  id="SUBMIT_TIME">
		<input type="hidden"  id="SUBMIT_STAFF_ID">
		<input type="hidden"  id="SUBMIT_ORG_ID">
		<input type="hidden"  id="EMAIL">
		<input type="hidden"  id="FLOW_NO">
		<input type="hidden"  id="STAFF_ID">
	</div>
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
<script type="text/javascript" ssrc='<%=ResourceLoader.buildSrc("/resource/js/kindEditor/kindeditor.js" charset="utf-8")%>'></script>
<SCRIPT type="text/javascript" src='<%=ResourceLoader.buildSrc("/resource/js/form/formFieldTurn.js")%>'></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/resource/js/jquery-1.4.2.min.js")%>'></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/commonUtil.js")%>'></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/workshop/form/formFile/form_commons.js")%>'></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/jtitsmFormCommon.js")%>'></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/staffManage.js")%>'></script>
</HTML>