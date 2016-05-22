package com.kimreik.dialog;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;
import com.mysema.query.types.path.PathInits;


/**
 * QDialog is a Querydsl query type for Dialog
 */
@Generated("com.mysema.query.codegen.EntitySerializer")
public class QDialog extends EntityPathBase<Dialog> {

    private static final long serialVersionUID = -536073833L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDialog dialog = new QDialog("dialog");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final QPrivateMessage lastMessage;

    public final ListPath<PrivateMessage, QPrivateMessage> messages = this.<PrivateMessage, QPrivateMessage>createList("messages", PrivateMessage.class, QPrivateMessage.class, PathInits.DIRECT2);

    public final StringPath user1 = createString("user1");

    public final StringPath user2 = createString("user2");

    public QDialog(String variable) {
        this(Dialog.class, forVariable(variable), INITS);
    }

    public QDialog(Path<? extends Dialog> path) {
        this(path.getType(), path.getMetadata(), path.getMetadata().isRoot() ? INITS : PathInits.DEFAULT);
    }

    public QDialog(PathMetadata<?> metadata) {
        this(metadata, metadata.isRoot() ? INITS : PathInits.DEFAULT);
    }

    public QDialog(PathMetadata<?> metadata, PathInits inits) {
        this(Dialog.class, metadata, inits);
    }

    public QDialog(Class<? extends Dialog> type, PathMetadata<?> metadata, PathInits inits) {
        super(type, metadata, inits);
        this.lastMessage = inits.isInitialized("lastMessage") ? new QPrivateMessage(forProperty("lastMessage")) : null;
    }

}

