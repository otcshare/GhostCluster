PROJECT = GhostCluster

INSTALL_DIR = ${DESTDIR}/usr/share/$(PROJECT)
DESKTOP_DIR = ${DESTDIR}/usr/share/applications
ICON_DIR    = ${DESTDIR}/usr/share/pixmaps
VERSION     = $(shell grep version manifest.json | cut -f4 -d"\"")
PACKAGE     = $(PROJECT)-$(VERSION)

FILES = index.html *.js *.css manifest.json *.png *.xml

PKG_NAME := $(PROJECT)
SPECFILE = $(addsuffix .spec, $(PKG_NAME))
YAMLFILE = $(addsuffix .yaml, $(PKG_NAME))

all:
	@echo "Nothing to build"

widget:
	zip -r $(PKG_NAME).wgt $(FILES) assets

install:
	@echo "installing wgt widget file"
	mkdir -p $(INSTALL_DIR)/
	cp $(PKG_NAME).wgt $(INSTALL_DIR)/

#install:
#	mkdir -p $(INSTALL_DIR)/
#	cp -a assets $(INSTALL_DIR)/
#	cp $(FILES) $(INSTALL_DIR)/
#	mkdir -p $(DESKTOP_DIR)/
#	cp $(PROJECT).desktop $(DESKTOP_DIR)/
#	mkdir -p $(ICON_DIR)/
#	cp $(PROJECT).png $(ICON_DIR)/$(PROJECT).png

spec: 
	specify $<

dist:
	rm -rf $(PACKAGE)
	mkdir $(PACKAGE)
	git clone . $(PACKAGE)
	tar czf $(PACKAGE).tar.gz $(PACKAGE)
	
