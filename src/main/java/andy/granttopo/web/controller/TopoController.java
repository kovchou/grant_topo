package andy.granttopo.web.controller;

import andy.granttopo.model.Element;
import andy.granttopo.model.TopoCache;
import andy.granttopo.service.TopoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Set;

/**
 * Created by andy on 1/2/15.
 */
@Controller
@RequestMapping("/topo")
public class TopoController {
    @Autowired
    private TopoService topoService;

    @RequestMapping(value = "/allElements.do", produces = "application/json", method = RequestMethod.GET)
    public @ResponseBody Set<Element> getAllElements() {
        TopoCache topoCache = topoService.constructTopoCache();
        return topoCache.getAllElements();
    }
}
