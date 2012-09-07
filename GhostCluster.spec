# 
# Do NOT Edit the Auto-generated Part!
# Generated by: spectacle version 0.22
# 
# >> macros
# << macros

Name:       GhostCluster
Summary:    Automotive Meter Cluster Application
Version:    0.2012.2.3
Release:    1
Group:      Applications/System
License:    Apache 2.0
URL:        http://www.tizen.org
Source0:    %{name}-%{version}.tar.gz
BuildRequires:  desktop-file-utils


%description
Example guage cluster for tizen ivi




%prep
%setup -q -n %{name}-%{version}

# >> setup
# << setup

%build
# >> build pre
# << build pre


make %{?jobs:-j%jobs}

# >> build post
# << build post
%install
rm -rf %{buildroot}
# >> install pre
# << install pre
%make_install

# >> install post
# << install post
desktop-file-install --delete-original       \
  --dir %{buildroot}%{_datadir}/applications             \
   %{buildroot}%{_datadir}/applications/*.desktop






%files
%defattr(-,root,root,-)
%{_datadir}/GhostCluster
%{_datadir}/applications/GhostCluster.desktop
%{_datadir}/pixmaps/GhostCluster.png
# >> files
# << files

