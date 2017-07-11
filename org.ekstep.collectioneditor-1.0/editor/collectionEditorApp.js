angular.module('org.ekstep.collectioneditor', ["Scope.safeApply"]).controller('mainController', ['$scope', '$location', function($scope, $location) {
    //TODO: get config and data from environment
    var config = { "context": { "uid": "386", "contentId": "do_112272630392659968130", "sid": "0d5b94c87052869b58e47ec692f467cd", "channel": "ntp/ap", "pdata": { "id": "SunbirdPortal", "ver": "1.0" }, "dims": ["b27e743b51a22b4eed737c6a72cd4266"] }, "mode": "Edit", "rules": { "levels": 3, "objectTypes": [{ "type": "TextBook", "label": "Textbook", "isRoot": true, "editable": true, "childrenTypes": ["TextBookUnit"], "addType": "Editor", "iconClass": "fa fa-book fa-2" }, { "type": "TextBookUnit", "label": "Textbook Unit", "isRoot": false, "editable": true, "childrenTypes": ["TextBookUnit", "Collection", "Story", "Game", "Worksheet"], "addType": "Editor", "iconClass": "fa fa-folder fa-2" }, { "type": "Collection", "label": "Collection", "isRoot": false, "editable": false, "childrenTypes": [], "addType": "Browser", "iconClass": "fa fa-file fa-2" }, { "type": "Story", "label": "Story", "isRoot": false, "editable": false, "childrenTypes": [], "addType": "Browser", "iconClass": "fa fa-file fa-2" }, { "type": "Worksheet", "label": "Worksheet", "isRoot": false, "editable": false, "childrenTypes": [], "addType": "Browser", "iconClass": "fa fa-file fa-2" }, { "type": "Game", "label": "Game", "isRoot": false, "editable": false, "childrenTypes": [], "addType": "Browser", "iconClass": "fa fa-file fa-2" }] }, "defaultTemplate": {} };

    $scope.contentDetails = {
        contentTitle: "",
        contentImage: "/images/com_ekcontent/default-images/default-content.png",
    };
    $scope.contentId = config.context.contentId;
    $scope.metaPages = [];
    $scope.selectedObjectType = undefined;
    $scope.nodeFilter = "";
    $scope.getObjectType = function(objectType) {
        return _.find(objectType, function(type) {
            return type == $scope.selectedObjectType });
    }

    $scope.searchNode = function(event) {
        if ($scope.nodeFilter == "") org.ekstep.collectioneditor.collectionService.clearFilter();
        org.ekstep.collectioneditor.collectionService.filterNode($scope.nodeFilter);
    };

    $scope.setSelectedNode = function(event, data) {
        if (data.data.objectType) {
            $scope.selectedObjectType = data.data.objectType
            $scope.$safeApply();
        }
    };
    //Header scope starts
    $scope.headers = [];

    $scope.addToHeader = function(header) {
        $scope.headers.push(header);
        $scope.$safeApply();
    }

    org.ekstep.contenteditor.headerManager.initialize({ loadNgModules: $scope.loadNgModules, scope: $scope });

    //Header scope ends

    $scope.loadContent = function(callback) {
        org.ekstep.services.languageService.getCollectionHierarchy({ contentId: $scope.contentId }, function(err, res) {
            if (res && res.data && res.data.responseCode === "OK") {
                org.ekstep.collectioneditor.collectionService.fromCollection(res.data.result.content);
                $scope.metaPages = org.ekstep.collectioneditor.metaPageManager.getPages();
                $scope.$safeApply();
                callback && callback(err, res);
            } else {
                callback && callback('unable to fetch the content!', res);
            }
        });
    };

    $scope.showLessonBrowser = function(){
        ecEditor.dispatchEvent("org.ekstep.lessonbrowser:show", {"language": ["Kannada"], "grade": ["Grade 1"]}, function(selectedLessons){
            //
        });
    };

    org.ekstep.collectioneditor.api.initEditor(config, function() {
        $scope.loadContent(function(err, res) {
            if (res) {
                var activeNode = org.ekstep.collectioneditor.collectionService.getActiveNode();
                $scope.contentDetails.contentTitle = activeNode.title ? activeNode.title : "Untitled Content";
                setTimeout(function() { ecEditor.dispatchEvent('org.ekstep.collectioneditor:node:selected:' + activeNode.data.objectType, activeNode) }, 200);
            }
        });
    });


    ecEditor.addEventListener('org.ekstep.collectioneditor:node:selected', $scope.setSelectedNode, $scope);
}]);
//# sourceURL=collectiontreeApp.js
//
