aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.activitybrowser-1.0/ --recursive
aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.assessmentbrowser-1.0/ --recursive
aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.assetbrowser-1.0/ --recursive
aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.audio-1.0/ --recursive
aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.collaborator-1.0/ --recursive
aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.colorpicker-1.0/ --recursive
aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.conceptselector-1.0/ --recursive
aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.config-1.0/ --recursive
aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.developer-1.0/ --recursive
aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.download-1.0/ --recursive
aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.hotspot-1.0/ --recursive
aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.image-1.0/ --recursive
aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.preview-1.0/ --recursive
aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.quiz-1.0/ --recursive
aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.readalongbrowser-1.0/ --recursive
aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.scribblepad-1.0/ --recursive
aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.shape-1.0/ --recursive
aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.stage-1.0/ --recursive
aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.stageconfig-1.0/ --recursive
aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.telemetry-1.0/ --recursive
aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.templatebrowser-1.0/ --recursive
aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.text-1.0/ --recursive
aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.todo-1.0/ --recursive
aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.unsupported-1.0/ --recursive
aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.utils-1.0/ --recursive
aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.viewecml-1.0/ --recursive
aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.wordinfobrowser-1.0/ --recursive
aws s3 --region ap-south-1 rm s3://ekstep-public-$1/content-plugins/org.ekstep.video-1.0/ --recursive

aws s3 --region ap-south-1 cp ansible/content-plugins s3://ekstep-public-$1/content-plugins/ --recursive --acl public-read