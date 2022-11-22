docker run --detach --restart unless-stopped --network tunnel -p 61616:61616 -p 8161:8161 -p 61614:61614 `
		   -v E:\Angular\f2f-micro-services\activemq\conf:/opt/activemq/conf `
           -v E:\Angular\f2f-micro-services\activemq\data:/opt/activemq/data `
		   -e ACTIVEMQ_ENCRYPTION_PASSWORD="activemq" `
           rmohr/activemq
		   
		
INFO | ActiveMQ WebConsole available at http://0.0.0.0:8161/
INFO | ActiveMQ Jolokia REST API available at http://0.0.0.0:8161/api/jolokia/

$ bin/activemq encrypt --password activemq --input mypassword
$ bin/activemq encrypt --password activemq --input 19c124204

$ bin/activemq decrypt  --password activemq --input eeWjNyX6FY8Fjp3E+F6qTytV11bZItDp

tbEZBBhTUyPVzaUhjYFX1MpzCdu4jfS7