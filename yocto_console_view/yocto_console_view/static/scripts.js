BOWERDEPS="undefined"==typeof BOWERDEPS?{}:BOWERDEPS,function(){var e,t,i,n=function(e,t){return function(){return e.apply(t,arguments)}};e=function(){function e(){return["ui.router","ui.bootstrap","ngAnimate","guanlecoja.ui","bbData"]}return e}(),i=function(){function e(e,t,i){var n,l,s;l="console",t.addGroup({name:l,caption:"Yocto Console View",icon:"exclamation-circle",order:5}),n={group:l,caption:"Yocto Console View"},s={controller:l+"Controller",controllerAs:"c",templateUrl:"yocto_console_view/views/"+l+".html",name:l,url:"/"+l,data:n},e.state(s),i.addSettingsGroup({name:"Console",caption:"Console related settings",items:[{type:"integer",name:"buildLimit",caption:"Number of builds to fetch",default_value:200},{type:"integer",name:"changeLimit",caption:"Number of changes to fetch",default_value:30}]})}return e}(),t=function(){function e(e,t,i,l,s,o,a,r){var d,h;this.$scope=e,this.$window=i,this.$uibModal=a,this.$timeout=r,this.makeFakeChange=n(this.makeFakeChange,this),this.matchBuildWithChange=n(this.matchBuildWithChange,this),this._onChange=n(this._onChange,this),this.onChange=n(this.onChange,this),angular.extend(this,o),h=s.getSettingsGroup("Console"),this.buildLimit=h.buildLimit.value,this.changeLimit=h.changeLimit.value,this.dataAccessor=l.open().closeOnDestroy(this.$scope),this._infoIsExpanded={},this.$scope.all_builders=this.all_builders=this.dataAccessor.getBuilders(),this.$scope.builders=this.builders=[],"undefined"!=typeof Intl&&null!==Intl?(d=new Intl.Collator(void 0,{numeric:!0,sensitivity:"base"}),this.strcompare=d.compare):this.strcompare=function(e,t){return t>e?-1:e===t?0:1},this.$scope.revmapping=this.revmapping={},this.$scope.branchmapping=this.branchmapping={},this.$scope.builds=this.builds=this.dataAccessor.getBuilds({property:["yp_build_revision","yp_build_branch","reason"],limit:this.buildLimit,order:"-started_at"}),this.changes=this.dataAccessor.getChanges({limit:this.changeLimit,order:"-changeid"}),this.buildrequests=this.dataAccessor.getBuildrequests({limit:this.buildLimit,order:"-submitted_at"}),this.buildsets=this.dataAccessor.getBuildsets({limit:this.buildLimit,order:"-submitted_at"}),this.builds.onChange=this.changes.onChange=this.buildrequests.onChange=this.buildsets.onChange=this.onChange,this.builds.onNew=function(e){return function(t){return t.getProperties().onChange=function(t){var i,n,l,s;return l=!1,n=t.endpoint.split("/")[1],e.revmapping[n]||(s=e.getBuildProperty(t[0],"yp_build_revision"),null!=s&&(e.revmapping[n]=s,l=!0)),e.branchmapping[n]||(i=e.getBuildProperty(t[0],"yp_build_branch"),null!=i&&(e.branchmapping[n]=i,l=!0)),l&&null==e.onchange_debounce?e.onchange_debounce=e.$timeout(e._onChange,100):void 0}}}(this)}return e.prototype.getBuildProperty=function(e,t){var i;return i=e&&e.hasOwnProperty(t),i?e[t][0]:null},e.prototype.onChange=function(e){return 0!==this.builds.length&&0!==this.all_builders.length&&this.changes.$resolved&&0!==this.buildsets.length&&0!==this.buildrequests&&null==this.onchange_debounce?this.onchange_debounce=this.$timeout(this._onChange,100):void 0},e.prototype._onChange=function(){var e,t,i,n,l,s,o,a,r,d,h,c,u,g,p;for(this.onchange_debounce=void 0,d=this.builds,n=0,o=d.length;o>n;n++)e=d[n],this.all_builders.get(e.builderid).hasBuild=!0;for(this.sortBuildersByTags(this.all_builders),this.changesBySSID={},this.changesByRevision={},h=this.changes,l=0,a=h.length;a>l;l++)i=h[l],this.changesBySSID[i.sourcestamp.ssid]=i,this.changesByRevision[i.revision]=i,this.populateChange(i);for(c=this.builds,s=0,r=c.length;r>s;s++)e=c[s],this.matchBuildWithChange(e);this.filtered_changes=[],u=this.changesBySSID,g=[];for(p in u)i=u[p],i.comments&&(i.subject=i.comments.split("\n")[0]),g.push(function(){var e,n,l,s;for(l=i.builders,s=[],n=0,e=l.length;e>n;n++){if(t=l[n],t.builds.length>0){this.filtered_changes.push(i);break}s.push(void 0)}return s}.call(this));return g},e.prototype.sortBuildersByTags=function(e){var t,i,n,l,s,o,a,r,d,h,c,u,g,p,b,f;for(n=[],i="",l=0,a=e.length;a>l;l++)t=e[l],t.hasBuild&&(n.push(t),i+="."+t.builderid);if(i!==this.last_builderids_with_builds){for(p=this._sortBuildersByTags(n),b=[],u=[],c=function(e,t,i){var n,l;if(n=b[e],null==n)n=b[e]=[];else if(l=n[n.length-1],l.tag===t)return void(l.colspan+=i);return n.push({tag:t,colspan:i})},h=this,f=function(e,t){var i,n,l,s,o,a,r;c(t,e.tag,e.builders.length);{if(null!=e.tag_line&&0!==e.tag_line.length){for(a=e.tag_line,r=[],s=0,o=a.length;o>s;s++)i=a[s],r.push(f(i,t+1));return r}for(e.builders.sort(function(e,t){return h.strcompare(e.name,t.name)}),u=u.concat(e.builders),n=l=1;100>=l;n=++l)c(t+n,"",e.builders.length)}},s=0,r=p.length;r>s;s++)g=p[s],f(g,0);for(this.builders=u,this.tag_lines=[],o=0,d=b.length;d>o;o++)p=b[o],(1!==p.length||""!==p[0].tag)&&this.tag_lines.push(p);return this.last_builderids_with_builds=i}},e.prototype._sortBuildersByTags=function(e){var t,i,n,l,s,o,a,r,d,h,c,u,g,p,b,f,m,v,_,y,w,B,C,$,S,k;for(n={},o=0,d=e.length;d>o;o++)if(t=e[o],null!=t.tags)for(y=t.tags,a=0,h=y.length;h>a;a++)$=y[a],null==n[$]&&(n[$]=[]),n[$].push(t);k=[];for($ in n)i=n[$],i.length<e.length&&k.push({tag:$,builders:i});for(k.sort(function(e,t){return t.builders.length-e.builders.length}),S=[],l={},r=0,c=k.length;c>r;r++){for($=k[r],s=!1,w=$.builders,f=0,u=w.length;u>f;f++)if(t=w[f],l.hasOwnProperty(t.builderid)){s=!0;break}if(!s){for(B=$.builders,m=0,g=B.length;g>m;m++)t=B[m],l[t.builderid]=$.tag;S.push($)}}for(C=[],v=0,p=e.length;p>v;v++)t=e[v],l.hasOwnProperty(t.builderid)||C.push(t);if(C.length&&S.push({tag:"",builders:C}),S.length>1)for(_=0,b=S.length;b>_;_++)$=S[_],$.tag_line=this._sortBuildersByTags($.builders);return S},e.prototype.populateChange=function(e){var t,i,n,l,s;for(e.builders=[],e.buildersById={},l=this.builders,s=[],i=0,n=l.length;n>i;i++)t=l[i],t={builderid:t.builderid,name:t.name,builds:[]},e.builders.push(t),s.push(e.buildersById[t.builderid]=t);return s},e.prototype.matchBuildWithChange=function(e){var t,i,n,l,s,o,a,r,d,h,c,u,g;if(t=this.buildrequests.get(e.buildrequestid),null!=t&&(i=this.buildsets.get(t.buildsetid),null!=i)){if(null!=i&&null!=i.sourcestamps)for(a=i.sourcestamps,l=0,s=a.length;s>l;l++)g=a[l],n=this.changesBySSID[g.ssid];return null!=(null!=(r=e.properties)?r.yp_build_revision:void 0)||this.revmapping[e.buildid]?(u=null!=(null!=(d=e.properties)?d.yp_build_revision:void 0)?e.properties.yp_build_revision[0]:this.revmapping[e.buildid],n=this.changesByRevision[u],null==n&&(n=this.changesBySSID[u]),null==n&&(n=this.makeFakeChange(u,e.started_at,u)),null!=i&&null!=i.parent_buildid&&(o="Unresolved "+i.parent_buildid,delete this.changesBySSID[o]),o="Unresolved "+e.builderid+"-"+e.buildid,delete this.changesBySSID[o],n.caption="Commit",null!=(null!=(h=e.properties)?h.yp_build_branch:void 0)&&(n.caption=e.properties.yp_build_branch[0]),this.branchmapping[e.buildid]&&(n.caption=this.branchmapping[e.buildid]),n.revlink="http://git.yoctoproject.org/cgit.cgi/poky/commit/?id="+u,n.errorlink="http://errors.yoctoproject.org/Errors/Latest/?filter="+u+"&type=commit&limit=150",null!=(null!=(c=e.properties)?c.reason:void 0)&&(n.reason=e.properties.reason[0])):(null!=i&&null!=i.parent_buildid&&(u="Unresolved "+i.parent_buildid,null==n&&(n=this.changesBySSID[u]),null==n&&(o="Unresolved "+e.builderid+"-"+e.buildid,delete this.changesBySSID[o],n=this.makeFakeChange(u,e.started_at,u))),null==n&&(u="Unresolved "+e.builderid+"-"+e.buildid,null==n&&(n=this.changesBySSID[u]),null==n&&(n=this.makeFakeChange(u,e.started_at,u))),n.caption=u),n.buildersById[e.builderid].builds.push(e)}},e.prototype.makeFakeChange=function(e,t,i){var n;return n={revision:e,changeid:e,when_timestamp:t,comments:i},this.changesBySSID[e]=n,this.populateChange(n),n},e.prototype.openAll=function(){var e,t,i,n,l;for(n=this.filtered_changes,l=[],t=0,i=n.length;i>t;t++)e=n[t],l.push(e.show_details=!0);return l},e.prototype.closeAll=function(){var e,t,i,n,l;for(n=this.filtered_changes,l=[],t=0,i=n.length;i>t;t++)e=n[t],l.push(e.show_details=!1);return l},e.prototype.getRowHeaderWidth=function(){return this.hasExpanded()?400:200},e.prototype.getColHeaderHeight=function(){var e,t,i,n,l;for(n=0,l=this.builders,t=0,i=l.length;i>t;t++)e=l[t],n=Math.max(e.name.length,n);return Math.max(100,3*n)},e.prototype.isBigTable=function(){var e;return e=this.getRowHeaderWidth(),(this.$window.innerWidth-e)/this.builders.length<40?!0:!1},e.prototype.hasExpanded=function(){var e,t,i,n;for(n=this.changes,t=0,i=n.length;i>t;t++)if(e=n[t],this.infoIsExpanded(e))return!0;return!1},e.prototype.selectBuild=function(e){var t;return t=this.$uibModal.open({templateUrl:"yocto_console_view/views/modal.html",controller:"consoleModalController as modal",windowClass:"modal-big",resolve:{selectedBuild:function(){return e}}})},e.prototype.toggleInfo=function(e){return e.show_details=!e.show_details},e.prototype.infoIsExpanded=function(e){return e.show_details},e}(),angular.module("yocto_console_view",new e).config(["$stateProvider","glMenuServiceProvider","bbSettingsServiceProvider",i]).controller("consoleController",["$scope","$q","$window","dataService","bbSettingsService","resultsService","$uibModal","$timeout",t])}.call(this),function(){var e,t;e=function(){function e(){return{replace:!1,restrict:"E",scope:!1,templateUrl:"yocto_console_view/views/releaseselectorfield.html",controller:"_ReleaseselectorfieldController"}}return e}(),t=function(){function e(e,t){var i,n,l;for(l=e;null!=l&&null==l.rootfield;)l=l.$parent;return null==l?void console.log("rootfield not found!?!?"):(i={},n=function(e){var t,l,s,o;for(o=[],l=0,s=e.length;s>l;l++)t=e[l],null!=t.fields?o.push(n(t.fields)):o.push(i[t.fullName]=t);return o},n(l.rootfield.fields),console.log(i),void e.$watch("field.value",function(t,n){var l,s,o,a;if(o=e.field.selectors[t],null!=o){s=[];for(l in o)a=o[l],console.log(l),s.push(i[l].value=a);return s}}))}return e}(),angular.module("yocto_console_view").directive("releaseselectorfield",[e]).controller("_ReleaseselectorfieldController",["$scope","$http",t])}.call(this),function(){var e;e=function(){function e(){return{replace:!0,restrict:"E",scope:{change:"=",compact:"=?"},templateUrl:"yocto_console_view/views/yoctochangedetails.html"}}return e}(),angular.module("common").directive("yoctochangedetails",[e])}.call(this),function(){var e;e=function(){function e(e,t,i){this.$uibModalInstance=t,this.selectedBuild=i,e.$on("$stateChangeStart",function(e){return function(){return e.close()}}(this))}return e.prototype.close=function(){return this.$uibModalInstance.close()},e}(),angular.module("yocto_console_view").controller("consoleModalController",["$scope","$uibModalInstance","selectedBuild",e])}.call(this),angular.module("yocto_console_view").run(["$templateCache",function(e){e.put("yocto_console_view/views/console.html",'<div class="console no-select"><div class="load-indicator" ng-hide="c.builds.$resolved &amp;&amp; c.changes.$resolved &amp;&amp; c.buildrequests.$resolved &amp;&amp; c.buildsets.$resolved"><div class="spinner"><i class="fa fa-circle-o-notch fa-spin fa-2x"></i><p>loading</p></div></div><div ng-show="c.changes.$resolved &amp;&amp; c.filtered_changes.length==0"><p>No changes. Console view needs changesource to be setup, and<a href="#changes">changes</a>to be in the system.</p></div><table class="table table-striped table-bordered" ng-hide="c.filtered_changes.length==0" ng-class="{\'table-fixedwidth\': c.isBigTable()}"><tr class="first-row"><th class="row-header" ng-style="{\'width\': c.getRowHeaderWidth()}"><i class="fa fa-plus-circle pull-left" ng-click="c.openAll()" uib-tooltip="Open information for all changes" uib-tooltip-placement="right"></i><i class="fa fa-minus-circle pull-left" ng-click="c.closeAll()" uib-tooltip="Close information for all changes" uib-tooltip-placement="right"></i></th><th class="column" ng-repeat="builder in c.builders"><span class="builder" ng-style="{\'margin-top\': c.getColHeaderHeight()}"><a ng-href="#/builders/{{ builder.builderid }}" ng-bind="builder.name"></a></span></th></tr><tr class="tag_row" ng-repeat="tag_line in c.tag_lines"><td class="row-header"></td><td ng-repeat="tag in tag_line" colspan="{{tag.colspan}}"><span uib-tooltip="{{ tag.tag }}" ng-style="{width: tag.colspan*50}">{{tag.tag}}</span></td></tr><tr ng-repeat="change in c.filtered_changes | orderBy: [\'-when_timestamp\'] track by change.changeid"><td><yoctochangedetails change="change"></yoctochangedetails></td><td class="column" ng-repeat="builder in change.builders" title="{{builder.name}}"><a ng-repeat="build in builder.builds | orderBy: [\'number\']"><span class="badge-status" ng-if="build.buildid" ng-class="c.results2class(build, \'pulse\')" ng-click="c.selectBuild(build)">{{ build.number }}</span></a></td></tr></table></div>'),e.put("yocto_console_view/views/releaseselectorfield.html",'<basefield><label class="control-label col-sm-2" for="{{field.name}}">{{field.label}}</label><div class="col-sm-10"><select class="form-control" ng-model="field.value" ng-options="v for v in field.choices"></select></div></basefield>'),e.put("yocto_console_view/views/yoctochangedetails.html",'<div class="yoctochangedetails" style="width:100%;"><div style="width:100%;" ng-click="change.show_details = !change.show_details"><a ng-if="change.revlink" ng-href="{{change.revlink}}" uib-tooltip="{{change.comments}}">{{ change.caption }} &nbsp;</a><a ng-if="change.errorlink" ng-href="{{change.errorlink}}">{{ "Errors" }} &nbsp;</a><span ng-if="!change.revlink" uib-tooltip="{{change.comments}}">{{ change.caption }} &nbsp;</span><span ng-if="!compact" uib-tooltip="{{change.when_timestamp | dateformat:\'LLL\'}}">({{ change.when_timestamp | timeago }}) &nbsp;</span><i class="fa fa-chevron-circle-right rotate clickable" ng-class="{\'fa-rotate-90\':change.show_details}"></i></div><div class="anim-changedetails" ng-show="change.show_details"><table class="table table-striped table-condensed" ng-show="change.show_details"><tr ng-show="change.reason"><td>Reason</td><td>{{ change.reason }}</td></tr><tr ng-show="change.author"><td>Author</td><td>{{ change.author }}</td></tr><tr><td>Date</td><td>{{ change.when_timestamp | dateformat:\'LLL\'}} ({{ change.when_timestamp | timeago }})</td></tr><tr ng-show="change.repository"><td>Repository</td><td>{{ change.repository }}</td></tr><tr ng-show="change.branch"><td>Branch</td><td>{{ change.branch }}</td></tr><tr><td>Revision</td><td> <a ng-if="change.revlink" ng-href="{{change.revlink}}"> {{ change.revision }}</a></td></tr></table><h5>Comment</h5><pre>{{ change.comments }}</pre><h5>Changed files</h5><ul><li ng-repeat="file in change.files">{{file}}</li></ul><p ng-hide="change.files.length">No files</p></div></div>'),e.put("yocto_console_view/views/modal.html",'<!-- Show build summary for the selected build in a modal window--><div class="modal-header"><i class="fa fa-times pull-right" ng-click="modal.close()"></i><h4 class="modal-title">Build summary</h4></div><div class="modal-body"><buildsummary ng-if="modal.selectedBuild" buildid="modal.selectedBuild.buildid"></buildsummary></div>')}]);