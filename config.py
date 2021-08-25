#
# SPDX-License-Identifier: GPL-2.0-only
#

# ## Build configuration, tied to config.json in yocto-autobuilder-helpers
# Repositories used by each builder
buildertorepos = {
    "eclipse-plugin-neon": ["eclipse-poky-neon"],
    "eclipse-plugin-oxygen": ["eclipse-poky-oxygen"],
    "a-quick": ["poky", "meta-intel", "oecore", "bitbake",
                "meta-mingw", "meta-gplv2"],
    "a-full": ["poky", "meta-intel", "oecore", "bitbake",
                "meta-mingw", "meta-gplv2", "meta-arm", "meta-aws", "meta-agl", "meta-openembedded"],
    "non-gpl3": ["poky", "meta-gplv2"],
    "meta-mingw": ["poky", "meta-mingw"],
    "qa-extras": ["poky", "meta-mingw"],
    "meta-oe": ["poky", "meta-openembedded"],
    "meta-virt": ["poky", "meta-openembedded", "meta-virtualization"],
    "meta-intel": ["poky", "meta-intel"],
    "meta-arm": ["poky", "meta-arm"],
    "meta-agl-core": ["poky", "meta-agl"],
    "meta-aws": ["poky", "meta-aws", "meta-openembedded"],
    "qemuarm-oecore": ["oecore", "bitbake"],
    "checkuri": ["poky"],
    "check-layer": ["poky", "meta-mingw", "meta-gplv2"],
    "check-layer-nightly": ["poky", "meta-agl", "meta-arm", "meta-aws", "meta-intel", "meta-openembedded", "meta-virtualization", "meta-ti", "meta-security"],
    "docs": ["yocto-docs", "bitbake"],
    "mukube": ["mukube", "poky", "meta-virtualization", "meta-openembedded", "meta-security", "meta-selinux"],
    "default": ["poky"]
}

# Repositories used that the scripts need to know about and should be buildbot
# user customisable
repos = {
    "yocto-autobuilder-helper":
    ["https://github.com/distributed-technologies/yocto-autobuilder-helper.git",
         "main"],
    "eclipse-poky-neon": ["git://git.yoctoproject.org/eclipse-yocto",
                          "neon-master"],
    "eclipse-poky-oxygen": ["git://git.yoctoproject.org/eclipse-yocto",
                            "oxygen-master"],
    "poky": ["git://git.yoctoproject.org/poky", "hardknott"],
    "mukube": ["https://github.com/distributed-technologies/mukube.git", "feature/yocto-switch"],
    "meta-security": ["https://git.yoctoproject.org/cgit/cgit.cgi/meta-security/", "hardknott"],
    "meta-selinux": ["https://git.yoctoproject.org/cgit/cgit.cgi/meta-selinux/", "hardknott"],
    "meta-intel": ["git://git.yoctoproject.org/meta-intel", "hardknott"],
    "meta-arm": ["git://git.yoctoproject.org/meta-arm", "master"],
    "meta-agl": ["https://git.automotivelinux.org/AGL/meta-agl", "next"],
    "meta-aws": ["https://github.com/aws/meta-aws.git", "master"],
    "meta-ti": ["git://git.yoctoproject.org/meta-ti", "master"],
    "meta-security": ["git://git.yoctoproject.org/meta-security", "hardknott"],
    "oecore": ["git://git.openembedded.org/openembedded-core", "hardknott"],
    "bitbake": ["git://git.openembedded.org/bitbake", "master"],
    "meta-qt4": ["git://git.yoctoproject.org/meta-qt4", "master"],
    "meta-qt3": ["git://git.yoctoproject.org/meta-qt3", "master"],
    "meta-mingw": ["git://git.yoctoproject.org/meta-mingw", "master"],
    "meta-gplv2": ["git://git.yoctoproject.org/meta-gplv2", "master"],
    "meta-openembedded": ["git://git.openembedded.org/meta-openembedded", "hardknott"],
    "meta-virtualization": ["git://git.yoctoproject.org/meta-virtualization", "hardknott"],
    "yocto-docs": ["git://git.yoctoproject.org/yocto-docs", "master"]
}

trigger_builders_wait_shared = [
    "qemux86", "qemux86-alt",
    "qemux86-64", "qemux86-64-alt",
    "qemux86-64-x32", "qemux86-world",
    "genericx86", "genericx86-alt",
    "genericx86-64", "genericx86-64-alt",
    "build-appliance", "buildtools",
    "non-gpl3", "wic",
    "poky-tiny", 
    "qa-extras", 
    "qa-extras2",
    "check-layer",
    "mukube",
]

trigger_builders_wait_quick = trigger_builders_wait_shared + [
    "oe-selftest", "reproducible"
]

trigger_builders_wait_full = trigger_builders_wait_shared + [
    "qemux86-world-alt",
    "qemux86-64-ptest", "qemux86-64-ltp",
    "meta-intel", "meta-aws", "meta-agl-core"
]

trigger_builders_wait_quick_releases = {
    "zeus" : trigger_builders_wait_quick + ["mpc8315e-rdb"],
    "thud" : trigger_builders_wait_quick + ["mpc8315e-rdb"],
    "sumo" : trigger_builders_wait_quick + ["mpc8315e-rdb"]
}

trigger_builders_wait_full_releases = {
    "zeus" : trigger_builders_wait_full + ["mpc8315e-rdb-alt"],
    "thud" : trigger_builders_wait_full + ["mpc8315e-rdb-alt"],
    "sumo" : trigger_builders_wait_shared + ["qemumips-alt", "edgerouter-alt", "mpc8315e-rdb-alt", "qemuppc-alt", "qemux86-world-alt",
                                             "oe-selftest-ubuntu", "oe-selftest-debian", "oe-selftest-centos"]
}

trigger_builders_wait_perf = []

# Builders which are individually triggered
builders_others = [
    "meta-oe", 
    "meta-virt",
    "bringup",
    "qemuarm-armhost",
    "check-layer-nightly",
    "auh",
    "mukube",
]

subbuilders = list(set(trigger_builders_wait_quick + trigger_builders_wait_full + trigger_builders_wait_perf + builders_others))
builders = ["a-quick", "a-full", "docs"] + subbuilders

# ## Cluster configuration
# Publishing settings
sharedrepodir = "/home/pokybuild3/repos"
publish_dest = "/home/pokybuild3/publish"

# Web UI settings
web_port = 8080

# List of workers in the cluster

workers = ["worker"]

workers_bringup = []
# workers with wine on them for meta-mingw
workers_wine = []
workers_buildperf = []
workers_arm = []
# workers which don't need buildtools for AUH
workers_auh = []

all_workers = workers + workers_bringup + workers_buildperf + workers_arm

# Worker filtering for older releases
workers_prev_releases = {
    "hardknott" : ("centos7", "centos8", "debian8", "debian9", "debian10", "fedora31", "fedora32", "fedora33", "opensuse152", "ubuntu1604", "ubuntu1804", "ubuntu2004", "perf-"),
    "gatesgarth" : ("centos7", "centos8", "debian8", "debian9", "debian10", "fedora30", "fedora31", "fedora32", "opensuse150", "opensuse151", "opensuse152", "ubuntu1604", "ubuntu1804", "ubuntu1904", "ubuntu2004", "perf-"),
    "dunfell" : ("centos7", "centos8", "debian8", "debian9", "debian10", "fedora29", "fedora30", "fedora31", "fedora32", "fedora33", "opensuse150", "opensuse151", "opensuse152", "ubuntu1604", "ubuntu1804", "ubuntu1904", "ubuntu2004", "perf-"),
    "zeus" : ("centos7", "debian8", "debian9", "debian10", "fedora28", "fedora29", "fedora30", "opensuse150", "opensuse151", "ubuntu1604", "ubuntu1804", "ubuntu1904", "perf-"),
    "warrior" : ("centos7", "debian8", "debian9", "debian10", "fedora28", "fedora29", "fedora30", "opensuse150", "opensuse151", "ubuntu1604", "ubuntu1804", "ubuntu1904", "perf-"),
    "thud" : ("centos7", "debian8", "debian9", "debian10", "fedora28", "fedora29", "fedora30", "opensuse150", "opensuse151", "ubuntu1604", "ubuntu1804", "ubuntu1904", "perf-"),
    "sumo" : ("centos7", "debian8", "debian9", "fedora28", "ubuntu1604", "ubuntu1804", "perf-")
}

# Worker configuration, all workers configured the same...
# TODO: support per-worker config
worker_password = "pass"
worker_max_builds = None
notify_on_missing = None

# Some builders should only run on specific workers (host OS dependent)
builder_to_workers = {
    "default": workers
}
