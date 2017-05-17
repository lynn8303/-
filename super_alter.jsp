<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ page import="com.bsnnms.bean.common.resource.ResourceLoader"%> 
<HTML XMLNS:IE>
<HEAD>
<META http-equiv="Content-Type" content="text/html; charset=gbk">
<TITLE>变更管理单</TITLE>
<?IMPORT namespace="IE" implementation='<%=ResourceLoader.buildSrc("/resource/htc/dbTree.htc")%>'>	
	<script type='text/javascript'>
	 	function doCheck(){
			to_test_after_create("jtitsm_13403");
			return false;
	 	}

 	</SCRIPT>
	<link href='<%=ResourceLoader.buildSrc("/resource/css/publicCss.css")%>' type="text/css" rel="stylesheet" charset="gbk"/>
	<link href='<%=ResourceLoader.buildSrc("/assets/plugins/jquery-loadmask/jquery.loadmask.css")%>' rel="stylesheet" />
	<link href='<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/css/super_alter.js")%>' type="text/css" rel="stylesheet" charset="gbk"/>
	<style>IE\\:button {behavior:url(<%=ResourceLoader.buildSrc("resource/htc/btn.htc")%>)}</style>
	<STYLE>
		@media all{
			IE\:tree{ 
				behavior:url(<%=ResourceLoader.buildSrc("/resource/htc/tree.htc")%>);
			}
		}
		.xmlTable {
			behavior:url(<%=ResourceLoader.buildSrc("/resource/htc/table.htc")%>);
		}

		@import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/table.css")%>);
		@import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/default.css")%>);
		@import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/btn.css")%>);
		@import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/PopupMenu.css")%>);
		@import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/page.css")%>);
		@import url(<%=ResourceLoader.buildSrc("/resource/css/jtitsm/mpc.css")%>);
		@import url(<%=ResourceLoader.buildSrc("/resource/css/flow.css")%>);
	</STYLE>
</HEAD>
<BODY>
<div id="floatBoxBg"></div>
<div id="floatBox" class="floatBox">
	<div class="title" ondblclick="fullWind('HIDE')">
		<h4>变更描述:</h4>
		<span onclick="fullWind('HIDE')" title="退出全屏" style="float:left;font-size:12px;margin:3px 15px 0 20px;color:#194FA7;line-height:18px;" onMouseOver="this.style.fontWeight='bold';this.style.color='#ff0000';" onMouseOut="this.style.fontWeight='normal';this.style.color='#194FA7';">[退出全屏]</span>
		<!-- span onclick="fullWind('HIDE')" title="退出全屏" onMouseOver="this.style.fontWeight='bold';" onMouseOut="this.style.fontWeight='normal';">×</span -->
		<span style="height:17px;line-height:15px;font-family:Webdings;float:right;font-size:16px;color:#7F9DB9;margin-right:0px;cursor:hand;" 
			onclick="fullWind('HIDE')" 
			onMouseOver="this.style.color='#FF0000';" 
			onMouseOut="this.style.color='7F9DB9';" title="还原窗口">&nbsp;0&nbsp;</span>
	</div>
	<div class="content" id="floatBoxContent">
		<textarea id="DESCRIBE_TEMP" style="WIDTH:100%;height:99%;line-height:18px;"></textarea>
	</div>
</div>

<div id="con1" class="conCss">
	<div id='contentStart'></div>
	<form class='formsPanel_3'>
			<label for='ALTER_ORG_NAME'>变更发起部门:</label>
			<input style="width:18%;height:20px;padding:0px; margin:3px 0px;" type="text" id="ALTER_ORG_NAME" readonly/>
			
			 <label for='SUBMIT_STAFF_NAME'>变更发起人:</label>
			<input style="width:18%;height:20px;padding:0px; margin:3px 0px;" type="text" id="SUBMIT_STAFF_NAME" readonly/>
			
			 <label for='PHS'>联系电话:</label>
			<input style="width:18%;height:20px;padding:0px; margin:3px 0px;" type="text" id="MOBILE" readonly/>
			
			<label for='BELONG_SYSTEM'><font class="labelLink" onMouseOver="this.className='labelLinkOver'" onMouseOut="this.className='labelLink'" 
				onClick="selectSystem_belongSystem()" title="选择系统">变更所属系统:</font></label>
			<input id="BELONG_SYSTEM" style="width:18%;" readonly="readonly" />
			
			 <label for='ALTER_SOURCE'>变更来源:</label>
			 <select id="ALTER_SOURCE" style="width:18%;"/></select>
			
			<label for='PRIORITY_LEVEL'>重要等级:</label>
            <select id="PRIORITY_LEVEL"  style="width:18%;"/></select>
			
			<label for='EFFECT_LEVEL'>业务影响程度:</label>
            <select id="EFFECT_LEVEL" style="width:18%;"></select>
			
			<label>
				<font onClick="selectSystem();" title="选择系统" class="labelLink" onMouseOver="this.className='labelLinkOver'" 
					onMouseOut="this.className='labelLink'">所影响业务系统:</font>
			</label>
			<input type="text" id="EFFECT_SYSTEM" style="width:18%;" readonly="readonly"/>	
			<input name="hidden" type="hidden" id="EFFECT_SYSTEM_ID" />
			
			<label for='HOPE_FINISH_TIME'>要求完成时间:</label>
			<input type="text" id="HOPE_FINISH_TIME" onFocus="WdatePicker({isShowClear:true,dateFmt:'yyyy-MM-dd', readOnly:true})" readonly="readonly" style="width:18%;"/>
				
			<div style="display:none;">
				<label for='UNION_RELEASE_ID'>联合发布号:</label>
				<input type="text" id="UNION_RELEASE_ID"  style="width:18%;"/>					
				<input type="hidden" id="SEQ_UNION_RELEASE_ID"/>
				<span id="UnionReleaseBtn" style="width:auto;margin-left:2px;display:none"
						class="flatBut" onMouseOver="this.className='flatButOver'"
						onMouseDown="this.className='flatButDown'"
						onMouseOut="this.className='flatBut'" 
						onclick="getUnionReleaseId()" />&nbsp;&nbsp;自动生成&nbsp;&nbsp;</span>										
                <label for='UNION_RELEASE_COUNT' style="width:8.25%;">联合发布数:</label>
				<input type="text" id="UNION_RELEASE_COUNT" maxlength="3" style="width:18%;"/>
			<div id="divAutoList" style="display:none"></div>
			</div>
			<div>
				<label for='TITLE'>变更标题:</label>
				<input type="text" id="TITLE" onBlur="validate(getObj('TITLE'),'标题不能含特殊字符如：!?~`@#^&')" style="width:50%;overflow:auto;overflow-y:visible;"/>
				
				<label for="ALTER_ORDER_ID">单号：</label>				
				<input id="ALTER_ORDER_ID" readonly="readonly"/>
			</div>
	    </form>
	    
	    <div id="flowProDiv" class="formsPanel_3_div" style="display:none;">         
	        <label class="divLabel">进展情况:</label>
	        <span class="divSpan" style="WIDTH: 82%; float: left; text-align:center; border: 1px solid #94B0CB; background-color: #EFF4FE;">
	            <div align='center'
	                class="xmlTable"
	                imgPath='../../../resource/image/'
	                pageindex="10"
	                isMultiply="false"
	                oDataHead='flowProgressHead'
	                isPage='false'
	                id='flowProgressData'
	                pagesize='10'>
	            </div>
	            <table id="flowProgressHead" style="width:100%;display:none;">
	                <TR>
	                   <TD class="form_title" width="200">负责人</TD>
	                   <TD class="form_title">进度说明</TD>
	                   <TD class="form_title" width="250">最后更新时间</TD>
	                </TR>
	            </table>
	            <div style="width:99%;">
		          	<div id="flowProButs" style="width:99%;border-top:0px dashed #99B6E4;padding:0px 0 3px 0;">
		                <span id="flowProDelBut" style="float: right; width:auto; height:16px; line-height:15px; margin: 0px 20px 0px 10px;" class="flatBut" onMouseOver="this.className='flatButOver'" onMouseDown="this.className='flatButDown'" onMouseOut="this.className='flatBut'" 
		                    onclick="flowProDel(document.all.flowProgressData,oForm)"/>&nbsp;&nbsp;&nbsp;删 除&nbsp;&nbsp;&nbsp;</span>
		                <span id="flowProUpdateBut" style="float: right; width:auto; height:16px; line-height:15px; margin: 0px 20px 0px 10px;" class="flatBut" onMouseOver="this.className='flatButOver'" onMouseDown="this.className='flatButDown'" onMouseOut="this.className='flatBut'" 
		                    onclick="flowProUpdate(document.all.flowProgressData,oForm)"/>&nbsp;&nbsp;&nbsp;修 改&nbsp;&nbsp;&nbsp;</span>    
		                <span id="flowProAddBut" style="float: right; width:auto; height:16px; line-height:15px; margin: 0px 20px 0px 10px;" class="flatBut" onMouseOver="this.className='flatButOver'" onMouseDown="this.className='flatButDown'" onMouseOut="this.className='flatBut'" 
		                    onclick="flowProAdd(document.all.flowProgressData,oForm)"/>&nbsp;&nbsp;&nbsp;增 加&nbsp;&nbsp;&nbsp;</span>

		          	</div>
	          	</div>
	        </span>
        </div>
        
	    <div class="formsPanel_3_div">
			<label for='DESCRIBE' class="divLabel">变更描述:</label>
			<span class="divSpan">
				<IFRAME ID="DESCRIBE" src="/resource/ewebeditor/ewebeditor.htm?id=DESCRIBE&style=itnm&tmpDir=temp&skin=blue1" 
       			 	frameborder="0" scrolling="no" width=100% height="240" style='border-bottom:1px solid #97a5a8'></IFRAME> 
			</span>
		</div>
				            		
		<form class='formsPanel_3'>		
			<div id="MODEL_DIV" style = "display:none">
				<label for='MODEL_SPAN'>涉及业务模块:</label>
	         	<span id="MODEL_SPAN" style="width:70%" ></span>
		 	</div>
		 
		 	<div>
				<label for='APPENDIXS'>附件:</label>
				<span id="APPENDIXS" style="behavior:url(<%=ResourceLoader.buildSrc("/resource/htc/formAttach.htc")%>);WIDTH: 82%; float:left;
					border: 1px solid #94B0CB; background-color: #EFF4FE;" isAllowHistory="true"></span>
				<input type="hidden" id="APPENDIXS_VALUE" />
			</div>	 
		</form>
</div> 
 
<!--3.变更计划与方案制定: -->
<div id="con_12511" style="display:none;">
	<form class='formsPanel_3'> 
		<label for='version_plan' id='VERSION_NAME_L'><font class="labelLink" onMouseOver="this.className='labelLinkOver'" 
			onMouseOut="this.className='labelLink'"  onClick="chooseVersion()" title="选择版本" >版本计划:</font></label>
		<span id="version_plan" ><input type="text" id="VERSION_NAME" readonly="readonly" style="width:100%"/></span>			
				
		<label for='VERSION_TIME'>测试时间:</label>
		<input type="text" id="VERSION_TIME" readonly="readonly" onFocus="WdatePicker({isShowClear:true,dateFmt:'yyyy-MM-dd', readOnly:true})"/>
	
		<label for='PLAN_ONLINE_TIME'>开发要求完成时间:</label>
        <input type="text" id="PLAN_ONLINE_TIME" onFocus="WdatePicker({isShowClear:true,dateFmt:'yyyy-MM-dd', readOnly:true})" readonly="readonly"/>				
	</form>
	
	<form class='formsPanel_3'>
		<label for='ALTER_TYPE'>变更分类:</label>
		<select id='ALTER_TYPE'></select>
		
		<label>预计开发人日:</label>
		<input style="height:20px;padding:0px; margin:3px 0px;" type="text" id="DEV_PER_DAY"  onkeyup="value=value.replace(/[^\d]/g,'') "
			onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" />    
		
		<div>
	        <label for='CONFIRM_APPENDIXS'>方案确认文档:</label>
	        <span id="CONFIRM_APPENDIXS" style="behavior: url(<%=ResourceLoader.buildSrc("/resource/htc/formAttach.htc")%>);width:82%;float: left; 
	        	border: 1px solid #94B0CB; background-color: #EFF4FE;" isAllowHistory="true"></span>
      	</div>
	</form>
</div> 

<!--6.变更实施: -->

<div id="con_11820">

<div id="con_8326" style="display:none;">
	<form class='formsPanel_3'>
	
		<div id="JT_TEST_STAFF_INFO_DEV" style="padding-top:10px;display:none;">
			<label for='IT_TEST_STAFF'><font class="labelLink" onMouseOver="this.className='labelLinkOver'" onMouseOut="this.className='labelLink'" 
					onClick="choosePersonInfo(IT_TEST_STAFF_ID,IT_TEST_STAFF,IT_TEST_STAFF_EMAIL,IT_TEST_STAFF_TEL)" title="选择人员">集团IT配合测试人员:
			</font></label>

		    <input type="text" id="IT_TEST_STAFF" readonly="readonly"/>
		
			<label for='IT_TEST_STAFF_TEL'>联系电话:</label>
			<input type="text" id="IT_TEST_STAFF_TEL" />
			
			<label for='IT_TEST_STAFF_EMAIL'>联系邮箱:</label>
		    <input type="text" id="IT_TEST_STAFF_EMAIL" />
		
		</div>
		
		<div id="TEST_ATTACHS_DIV" style="display:none;">
			<label for='TEST_ATTACHS'>测试文档:</label>
			<span id="TEST_ATTACHS" style="behavior: url(<%=ResourceLoader.buildSrc("/resource/htc/formAttach.htc")%>);WIDTH: 82%; float: left; 
				border: 1px solid #94B0CB; background-color: #EFF4FE; " isAllowHistory="true"></span>
		</div>
		
		<div id="ALTER_FINISH_DIV">
			<label for='FINISH_TIME'>实际完成时间:</label>
		    <input type="text" id="FINISH_TIME"  onFocus="WdatePicker({isShowClear:true,dateFmt:'yyyy-MM-dd', readOnly:true})" readonly="readonly"/>
		
			<label for='FINISH_WORKLOAD'>变更实现工作量:</label>
			<input type="text" id="FINISH_WORKLOAD" style="width:80" onkeyup="value=value.replace(/[^\d]/g,'') "
				onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"/>
			<span style="width: auto; flow: left;" >人/日</span>
		</div>
		<div id="ALTER_FINISH_ATTACH_DIV">
			<label for='SS_APPENDIXS'>变更实现文档:</label>
			<span id="SS_APPENDIXS" style="behavior: url(<%=ResourceLoader.buildSrc("/resource/htc/formAttach.htc")%>);WIDTH: 83%; float: left;
				border: 1px solid #94B0CB; background-color: #EFF4FE;" isAllowHistory="true"></span>
		</div>

	</form>
	
	
</div> 
<div id="con_83267" style="display:none;margin-bottom:20px">
	<form class='formsPanel_3'>
		<table style="width:100%" id="function_point_table">
		<thead><tr><th><label style="">序号</label></th><th><label style="width:100%">功能点名称</label></th><th><label style="width:100%">所属类型</label></th><th><label style="width:100%">功能点变更描述</label></th><th><label style="width:100%">附件</label></th><th><label style="width:100%">操作类型</label></th></tr></thead>
		<tbody id="function_point_table_content"><!--
		<tr style="text-align:center;">
		<td>1</td>
		<td>新增</td>
		<td>新增</td>
		<td> <div class="content_desc">新增，请审批</div></td>
		<td><a>操作说明</a></td>
		<td><img src="flowV2/img/edit.jpg" onclick="getnewPoint();"> <img src="flowV2/img/rab.png" onclick="deleteNewPoint();"></td>
		</tr>
		
		--></tbody>
		
		</table>

    
		<div id="dialog-modal" title="功能点描述"> <p></p></div>
		<div id="ALTER_FINISH_DIV" style="padding-left:35%;">
			<span style="color:red;width:5px;">*</span><label for='SS_APPENDIXS'>新增功能点</label>
			<span><input id="newpoint" type="button" style="background: url(<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/flowV2/img/add2.png")%>) no-repeat;border:none;width:100px;" onclick="getnewPoint()"></span>
		</div>
	
	</form>
	
</div> 

</div>
<div  id='addNewPonit' class='comp-tool-bar'  style="display:none;z-index: 1000;float:left; background-color:white;border-bottom: #2279f3 1px solid;left: 298px; position: absolute; border-left: #2279f3 1px solid; width: 650px; width: 1000px;font-family: ; height: 530px; height: 650px;border-top: #2279f3 1px solid; top: 0px; border-right: #2279f3 1px solid; overflow:auto;">
<div style="background-color:#3176AF;width: 650px; font-family: ;width: 1000px; height: 40px;padding-top:10px;color:white;">
<div style="float:left;font-size:14px;FONT-SIZE: 14px; FONT-FAMILY: Microsoft YaHei; FONT-WEIGHT: bold; COLOR: #fff; MARGIN-LEFT: 10px">新增功能点</div>
<div><img style="margin-left:75%;float:right;" alt=""  src="flowV2/img/close.png" onclick="close1();"></div>
</div>
<form class='formsPanel_3' style="padding:10px;">
	<div id="ALTER_FINISH_DIV">
		<label for='SYETEM_NAME'style="width:19%;letter-spacing:2px;text-align:right;">系统名称:</label>
		<span><input type="text" disabled="false" id="SYETEM_NAME" /></span>
		<label for='FUNC_TYPE'style="width:18%;margin-left:20px;letter-spacing:2px;">
			<span style="color:red;margin-left:20px;margin-right:0;width:0;">*</span>所属类型:
		</label>
        <select id="FUNC_TYPE"  style="width:18%;"/>
        	<optgroup>
        			<option value="1">新增</option>
				<option  value="2">修改</option>
				<option  value="3">冻结</option>
        	</optgroup>

        </select>
	</div>

	<div id="ALTER_FINISH_DIV" style="margin-top:20px">
		<span style="color:red;width:0;margin-left:1px">*</span><label for='FUNC_NAME' style="width:18%;letter-spacing:1px;">功能点名称:</label>
		<span><IE:tree id="FUNC_NAME" treeHeight="200" width="150"   /></span>
		<label for='AREA_NAME' style="width:18%;letter-spacing:1px;margin-left:22px;">
			<span style="color:red;width:0;margin-left:1px; ">*</span>涉及区域:
		</label>
		<!--
		<select id="area"  multiple="multiple" class="form-control">
			
		-->
		<select id="area" style="width:18%;">
			<optgroup style="width:18%;">
			 	<option>----请选择---</option>
				<option></option>
			</optgroup>
		</select>		
	</div>
	<div id="ALTER_FINISH_DIV" style="margin-top:20px"><span style="width:140px;padding-left:10px;padding-right:0px;text-align:right;margin-left:22px;margin-left:100px;">功能点不准确？点击</span>	<input type="button" style="width: auto; font-size: 12px; background-color:#05DDDD;color:white;border:1px solid #05DDDD;boder-radus:25px; margin-top: ;" value="刷新" onclick="refresh();" /><span>更新字典</span>			
	</div>

	 <div id="ALTER_FINISH_DIV" style="margin-top:10px;height:200px;margin-top:20px">
		<label for='FUNC_ESC'style="width:19%;letter-spacing:1px;text-align:right">
			<span style="color:red;width:0;margin-left:0px;">*</span>功能点描述:
		</label>
	   <textarea id='FUNC_DESC' rows="5" style="width:70%;height:200px"></textarea>          
	</div>

	<div id="source">
		<div id="ATTATC_NAME" style="behavior: url(<%=ResourceLoader.buildSrc("/resource/htc/formAttach1.htc")%>);WIDTH: 100%; float: left;
			border: none; background-color: white;" isAllowHistory="false"></div>
		
	</div>	

	<div>
		<input type="button"  style="background: url(<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/flowV2/img/u626.png")%>) 
			no-repeat;width:75;margin-left:43%;height:30;border:none" onclick="addNewPoint();"/>
	</div>
</form>		
</div>
<div>

<div  id='updatePonit' class='comp-tool-bar'  style="display:none;z-index: 1000;float:left; background-color:white;border-bottom: #2279f3 1px solid; position: absolute;left: 298px;top:0px; border-left: #2279f3 1px solid; width: 650px; top: 0px; width: 1000px; font-family: ; height: 530px; height: 650px; border-top: #2279f3 1px solid; border-right: #2279f3 1px solid; overflow:auto;">
<div style="background-color:#3176AF;width:1000px; font-family: ; height: 40px;padding-top:10px;color:white;">
<div style="float:left;font-size:14px;FONT-SIZE: 14px; FONT-FAMILY: Microsoft YaHei; FONT-WEIGHT: bold; COLOR: #fff; MARGIN-LEFT: 10px">新增功能点</div>
<div><img style="margin-left:75%;float:right;" alt="" src='<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/flowV2/img/close.png")%>' 
	onclick="close2();"></div>
</div>

</div>
<div>


<div id="function_point_list" style="display: none;">
	<form class='formsPanel_3'>
		<label for='function_point_table1'>关联功能节点:</label>
		<table class="tableNoborder" style="border: #FFFFFF solid 1px; width: 1000px; background-color: white; padding: 20px" id="function_point_table1">
			<thead>
				<th style="color: #1258BB; width='10%'">序号</th>
				<th style="color: #1258BB; width='15%'">功能点名称</th>
				<th style="color: #1258BB; width='15%'">所属类型</th>
				<th style="color: #1258BB; width='30%'">功能点变更描述</th>
				<th style="color: #1258BB; width='30%'">附件(操作说明)</th>
			</thead>
			<tbody id="function_point_table_content1"></tbody>
		</table>
	</form>
</div>

<!--7.变更后审核: -->
<div id="con_bzhsh" style="display:none;"></div>

<div id="JTITSM_900191_DIV"   style="display:none;">  
	<form class='formsPanel_3'>                                     
   		<label for="AUDIT_RESULT_900191">测试结果:</label>
		<select id="AUDIT_RESULT_900191" onChange="oForm.execFlowUIHook()"/></select>
	   	<div>             
	       	<label for='AUDIT_DESC_900191'>结果描述:</label>
	       	<textarea id='AUDIT_DESC_900191' rows="5"></textarea>          
	   	</div>    
	   	<div>
	       	<label for='TEST_APPENDIXS'>测试报告:</label>
	       	<span id="TEST_APPENDIXS" style="behavior: url(<%=ResourceLoader.buildSrc("/resource/htc/formAttach.htc")%>);WIDTH: 82%; float: left; 
	       		border: 1px solid #94B0CB; background-color: #EFF4FE;" isAllowHistory="true"></span>
	  	</div>   
	  	    
	  	<div>
	       	<label for='OPT_APPENDIXS'>用户操作手册:</label>
	       	<span id="OPT_APPENDIXS" style="behavior: url(<%=ResourceLoader.buildSrc("/resource/htc/formAttach.htc")%>);WIDTH: 82%; float: left;
	       		border: 1px solid #94B0CB; background-color: #EFF4FE; " isAllowHistory="true"></span>
	  	</div>  
	</form>
 </div>

  
<div id="JTITSM_12375_DIV"   style="display:none;">  
   	<form class='formsPanel_3'>                                     
   		<label for="AUDIT_RESULT_12375">
       		<font id="AUDIT_RESULT_12375_WFLAG" style="width:auto;color:#FFAE00;font-size:10px;font-family:'宋体';margin:0 3px 0 0;">*</font>
       		用户测试结果:
       	</label>
       	<select id="AUDIT_RESULT_12375" onChange="oForm.execFlowUIHook()"/></select>
   	</form>
 </div>			
<!--关联表: -->
<div id="relFLowDiv" style=""></div>

<div id="editRelateDiv" style="display:none">
	<br>
	<span id="delRelateBut" style="float: right; width:auto; height:20px; line-height:20px; margin: 0px 50px 0px 20px;" class="flatBut" 
		onMouseOver="this.className='flatButOver'" onMouseDown="this.className='flatButDown'" onMouseOut="this.className='flatBut'" 
        onclick="delRelate()"/>&nbsp;&nbsp;&nbsp;删 除 关 联&nbsp;&nbsp;&nbsp;</span>
     <span id="addRelateBut" style="float: right; width:auto; height:20px; line-height:20px; margin: 0px 10px 0px 20px;" class="flatBut" 
     	onMouseOver="this.className='flatButOver'" onMouseDown="this.className='flatButDown'" onMouseOut="this.className='flatBut'" 
        onclick="addRelate()"/>&nbsp;&nbsp;&nbsp;增 加 关 联&nbsp;&nbsp;&nbsp;</span>
	<br>
</div>

<!--处理过程(列表方式): -->
<div id="flowFlogDiv" style="display:none;">
	<br>
	<div id="showPanel" style="width:97%;margin-left:3%;margin-top:5px;padding-top:3px;border-top:1px dashed #98C8FF;float:right">
		<span style="margin-left:10px;cursor:hand;font-size:13px;" onclick="hideOrShowFlog(document.getElementById('oFlowProcFrame'),document.getElementById('showPanel'))" onMouseOver="this.style.textDecoration='underline'" onMouseOut="this.style.textDecoration='none';">
			<font id="ssLegend" class="flowLegendImgCss">6</font>处理过程</span>
		<span id="chartShow" style="margin-left:40px;cursor:hand;text-Decoration:underline;font-size:13px;color:#0046D5;" 
			onclick="getProc(oForm)" onMouseOver="this.style.color='#FF0000';" onMouseOut="this.style.color='#0046D5';">
			<font style="font-family:Webdings;font-size:18px;">4</font>图形风格展示</span>
			
		<iframe src="about:blank" style="width: 95%; height: 100%; border: 0px solid black;overflow-y:none;" frameborder="0" id="oFlowProcFrame"></iframe>
	</div>			
</div>

<div style="display:none">
	<textarea id='AUDIT_CONTENT' rows="6" style="width:78%;height:92px;" ></textarea>
	<input type="text" id="RELATE_ID"  readonly="readonly" disabled/>
	<input type="text" id="SUBMIT_DATE" onFocus="setday(this,this,1)" readonly="readonly"/>
	<input type="text" id="EFFECT_ORG_NAME" readonly="readonly" style="width:36.3%"/>
	<input type="text" id="TELPHONE" style="width:13%;"/>
	<IE:dbTree id="ALTER_ORG_ID" treeHeight="200" width="100%" cfg="org" readOnly="true"/>
	<input type="hidden" id="POOL_ATTACH" />
	<input type="text" id="EMAIL" style="width:13%;"/>
	<input type="hidden" id="APPENDIXS_VALUE" />
	<input type="hidden"  id="ALTER_ID">
	<input type="hidden"  id="FLOW_ID">
	<input type="hidden"  id="SUBMIT_STAFF_ID">
	<input type="hidden"  id="PLAN_IMPLEMENT_PERSON_ID">
	<input type="hidden"  id="PLAN_FORMULATE_PERSON_ID">
	<input type="hidden"  id="AUDIT_PERSON_ID">
	<input type="hidden"  id="FORMULATE_PERSON_ID">
	<input type="hidden"  id="TEST_PERSON_ID">
	<input type="hidden"  id="REVIEW_PERSON_ID">
	<input type="hidden"  id="REQUEST_ID">
	<input type="hidden"  id="PHS">
	<input type="hidden"  id="BELONG_SYSTEM_ID" />
	<input type="hidden"  id="EFFECT_ORG_ID"/>
	<input type="hidden"  id="IMPLEMENT_VERSION_ID"/>
	<input type="hidden"  id="IS_REPLAN"/>
	<input type="hidden" id="VERSION_ID" />
	<input type="text" id="PLAN_START_TIME" onFocus="setday(this,this,0)" readonly="readonly" style="width:36.3%"/>
	<input type="text" id="PLAN_FINISH_TIME" onFocus="setday(this,this,0)" readonly="readonly" style="width:36%"/>
	<span type="text" id="IMPLEMENT_RULE" style="width:36.3%;background-color:#FFFFFF;"></span>	
	<input type="text" id="PLAN_IMPLEMENT_PERSON_NAME" readonly="readonly" style="width:36%"/>
	<input type="text" id="IMPLEMENT_VERSION" readonly="readonly" style="display:none;width:35%"/>	
	<textarea id='PLAN_FORMULATE_CONTENT' rows="5" style="width:82%;"></textarea>	
	<input type="text" id="PLAN_FORMULATE_PERSON_NAME" readonly="readonly" />
	<input type="text" id="PLAN_FORMULATE_TIME" onFocus="setday(this,this,1)" readonly="readonly"/>
	<input type="hidden" id='OPERAT_REMARK' />
    <input type="text" id="FORMULATE_PERSON_NAME" readonly="readonly" />
	<select id="FORMULATE_RESULT"/></select>
	<input type="text" id="FORMULATE_START_TIME" onFocus="setday(this,this,1)" maxlength="16" readonly="readonly" />
	<input type="text" id="FORMULATE_FINISH_TIME" onFocus="setday(this,this,1)" maxlength="16" readonly="readonly"/>
	<select id="FINISH_RESULT"/></select>
	<select id="REVIEW_RESULT"/></select>
	<textarea id='REVIEW_CONTENT' rows="6" style="width:82%;"></textarea>
	<input type="text" id="REVIEW_PERSON_NAME" readonly="readonly" />
	<input type="text" id="REVIEW_TIME" onFocus="setday(this,this,1)" readonly="readonly"/>
	<select multiple id="UTTERANCE_LEAD_CONTENT" style="width:90%;height:80px;margin:0;padding:0px;border:1px solid #94B0CB;" size="5"></select>
	<select id="IS_INTERRUPT"/></select>
	<textarea id='EFFECT_RANGE' rows="6" style="width:83%;"></textarea>
	<select id="TEST_RESULT"/></select>
	<textarea id='TEST_REMARK' rows="6" style="width:83%;"></textarea>
	<input type="text" id="TEST_PERSON_NAME" readonly="readonly" />
	<input type="text" id="TEST_FINISH_TIME" onFocus="setday(this,this,1)" readonly="readonly"/>
	<select id="AUDIT_RESULT" style="display:none"/></select>
	<input type="text" id="AUDIT_TIME" style="display:none" onFocus="setday(this,this,1)" readonly="readonly"/>
	<input type="text" id="AUDIT_PERSON_NAME" style="display:none" readonly="readonly" />
	<select multiple id="UTTERANCE_AUDIT_CONTENT" style="width:90%;height:80px;margin:0;padding:0px;border:1px solid #94B0CB;" size="5"
		ondblClick="selectUtteranceText(document.getElementById('UTTERANCE_AUDIT_CONTENT'),'AUDIT_CONTENT')">
	</select>
	<select id="ENABLE_RELATE" style="width:15%;" readonly="readonly"/></select>
	<input type="hidden" id="MODELS" />
	<input type="hidden" id="IT_TEST_STAFF_ID" />
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
<SCRIPT type="text/javascript" src='<%=ResourceLoader.buildSrc("/resource/js/form/formFieldTurn.js")%>'></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/resource/js/jQuery/jquery-1.10.1.min.js")%>'></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/resource/js/jquery.cookie.js")%>' charset="gbk"></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/resource/ewebeditor/eFormEditor.js")%>' charset="utf-8"></script>	
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/resource/js/busiMonitor/Result.js")%>'></script> 
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/super_alter.js")%>'></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/commonUtil.js")%>'></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/jtitsmFormCommon.js")%>'></script>
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/relateTableSearch.js")%>'></script>
<SCRIPT type="text/javascript" src='<%=ResourceLoader.buildSrc("/workshop/form/jtitsmFormFile/autoComplete.js")%>'></script>	
<script type="text/javascript" src='<%=ResourceLoader.buildSrc("/assets/plugins/jquery-loadmask/jquery.loadmask.js")%>' charset="gbk"></script>
</HTML>