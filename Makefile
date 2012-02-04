PROJECT = GhostCluster

INSTALL_DIR = ${DESTDIR}/usr/share/$(PROJECT)
DESKTOP_DIR = ${DESTDIR}/usr/share/applications
ICON_DIR    = ${DESTDIR}/usr/share/pixmaps
VERSION     = $(shell grep version manifest.json | cut -f4 -d"\"")
PACKAGE     = $(PROJECT)-$(VERSION)

all:
	@echo "Nothing to build"

install:
	mkdir -p $(INSTALL_DIR)/
	cp -a assets $(INSTALL_DIR)/
	cp index.html *.js style.css manifest.json $(PROJECT).png $(INSTALL_DIR)/
	mkdir -p $(DESKTOP_DIR)/
	cp $(PROJECT).desktop $(DESKTOP_DIR)/
	mkdir -p $(ICON_DIR)/
	cp $(PROJECT).png $(ICON_DIR)/$(PROJECT).png

dist:
	tar czf ../$(PACKAGE).tar.gz . 
	
