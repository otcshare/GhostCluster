PROJECT = GhostCluster

INSTALL_DIR = ${DESTDIR}/usr/share/$(PROJECT)
DESKTOP_DIR = ${DESTDIR}/usr/share/applications
ICON_DIR    = ${DESTDIR}/usr/share/pixmaps
VERSION     = ${
all:
	@echo "Nothing to build"

install:
	mkdir -p $(INSTALL_DIR)/
	cp -a assets $(INSTALL_DIR)/
	cp index.html style.css manifest.json $(PROJECT).png $(INSTALL_DIR)/
	mkdir -p $(DESKTOP_DIR)/
	cp $(PROJECT).desktop $(DESKTOP_DIR)/
	mkdir -p $(ICON_DIR)/
	cp $(PROJECT).png $(ICON_DIR)/$(PROJECT).png

dist:
	tar czf $(PROJECT)-$(VERSION).tar.gz . 
