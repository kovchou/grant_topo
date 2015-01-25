package andy.granttopo.service;

import andy.granttopo.db.TopoDao;
import andy.granttopo.model.Element;
import andy.granttopo.model.Link;
import andy.granttopo.model.Node;
import andy.granttopo.model.TopoCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

/**
 * Created by andy on 1/2/15.
 */
@Service
public class TopoService {
    @Autowired
    private TopoDao topoDao;

    public TopoCache constructTopoCache()
    {
        TopoCache topoCache = new TopoCache();
        List<Node> allNodes = topoDao.getAllNodes();
        List<Link> allLinks = topoDao.getAllLinks();
        topoCache.addElements(new HashSet<Element>(allNodes));
        topoCache.addElements(new HashSet<Element>(allLinks));

        return topoCache;
    }
}
