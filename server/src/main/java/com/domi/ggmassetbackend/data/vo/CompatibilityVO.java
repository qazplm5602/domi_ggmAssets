package com.domi.ggmassetbackend.data.vo;

import com.domi.ggmassetbackend.data.entity.Compatibility;
import lombok.Getter;

@Getter
public class CompatibilityVO {
    private String version;
    private boolean builtIn;
    private boolean urp;
    private boolean hdrp;

    public static CompatibilityVO from(Compatibility compatibility) {
        CompatibilityVO result = new CompatibilityVO();

        result.version = compatibility.getVersion();
        result.builtIn = compatibility.isBuiltIn();
        result.urp = compatibility.isUrp();
        result.hdrp = compatibility.isHdrp();

        return result;
    }
}
