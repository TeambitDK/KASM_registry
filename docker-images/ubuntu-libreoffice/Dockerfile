FROM kasmweb/core-ubuntu-noble:1.18.0

USER root

ENV DEBIAN_FRONTEND=noninteractive
ENV HOME=/home/kasm-default-profile
ENV STARTUPDIR=/dockerstartup

# Tilføj Microsoft fonts EULA accept
RUN echo "ttf-mscorefonts-installer msttcorefonts/accepted-mscorefonts-eula select true" | debconf-set-selections

# Installer LibreOffice med dansk sprogpakke
RUN apt-get update && apt-get install -y --no-install-recommends \
    libreoffice \
    libreoffice-l10n-da \
    libreoffice-help-da \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Installer Firefox
RUN apt-get update && apt-get install -y --no-install-recommends \
    firefox \
    firefox-locale-da \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Installer VS Code
RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    gpg \
    && wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > /usr/share/keyrings/packages.microsoft.gpg \
    && echo "deb [arch=amd64 signed-by=/usr/share/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list \
    && apt-get update \
    && apt-get install -y code \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Installer PDF viewer (Evince) og Microsoft-kompatible fonts
RUN apt-get update && apt-get install -y --no-install-recommends \
    evince \
    ttf-mscorefonts-installer \
    fonts-liberation \
    fonts-dejavu \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Installer LaTeX (kræves af TexMaths)
RUN apt-get update && apt-get install -y --no-install-recommends \
    texlive-base \
    texlive-latex-base \
    texlive-latex-extra \
    texlive-fonts-recommended \
    dvipng \
    unzip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Download og installer TexMaths extension til LibreOffice
RUN mkdir -p /usr/lib/libreoffice/share/extensions/texmaths \
    && curl -L -o /tmp/texmaths.oxt "https://extensions.libreoffice.org/assets/downloads/1236/1729932096/TexMaths-0.52.3.oxt" \
    && cd /usr/lib/libreoffice/share/extensions/texmaths \
    && unzip /tmp/texmaths.oxt \
    && rm /tmp/texmaths.oxt

# Installer grafik-programmer (GIMP, Inkscape)
RUN apt-get update && apt-get install -y --no-install-recommends \
    gimp \
    inkscape \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Installer ekstra værktøjer
RUN apt-get update && apt-get install -y --no-install-recommends \
    gnome-calculator \
    xfce4-screenshooter \
    gedit \
    file-roller \
    vlc \
    dia \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Opret desktop genveje - kopierer kun filer der findes
RUN for app in \
    libreoffice-writer \
    libreoffice-calc \
    libreoffice-impress \
    org.gnome.Evince \
    org.gnome.Calculator \
    org.gnome.gedit \
    org.gnome.TextEditor \
    firefox \
    code \
    gimp \
    org.inkscape.Inkscape \
    xfce4-screenshooter \
    vlc \
    dia \
    org.gnome.FileRoller \
    ; do \
    if [ -f "/usr/share/applications/${app}.desktop" ]; then \
        cp "/usr/share/applications/${app}.desktop" $HOME/Desktop/; \
    fi; \
    done \
    && chmod +x $HOME/Desktop/*.desktop \
    && chown -R 1000:1000 $HOME/Desktop/

# Skift tilbage til kasm-user
USER 1000

ENV HOME=/home/kasm-user
WORKDIR $HOME
