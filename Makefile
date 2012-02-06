PROJECT = GhostCluster

INSTALL_DIR = ${DESTDIR}/usr/share/$(PROJECT)
DESKTOP_DIR = ${DESTDIR}/usr/share/applications
ICON_DIR    = ${DESTDIR}/usr/share/pixmaps
VERSION     = $(shell grep version manifest.json | cut -f4 -d"\"")
PACKAGE     = $(PROJECT)-$(VERSION)

PKG_NAME := $(PROJECT)
SPECFILE = $(addsuffix .spec, $(PKG_NAME))
YAMLFILE = $(addsuffix .yaml, $(PKG_NAME))

include /usr/share/packaging-tools/Makefile.common

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
	rm -rf $(PACKAGE)
	mkdir $(PACKAGE)
	git clone . $(PACKAGE)
	tar czf $(PACKAGE).tar.gz $(PACKAGE)
	
