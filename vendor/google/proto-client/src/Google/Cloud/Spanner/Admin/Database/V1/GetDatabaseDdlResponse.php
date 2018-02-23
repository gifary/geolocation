<?php
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: google/spanner/admin/database/v1/spanner_database_admin.proto

namespace Google\Cloud\Spanner\Admin\Database\V1;

use Google\Protobuf\Internal\GPBType;
use Google\Protobuf\Internal\RepeatedField;
use Google\Protobuf\Internal\GPBUtil;

/**
 * The response for [GetDatabaseDdl][google.spanner.admin.database.v1.DatabaseAdmin.GetDatabaseDdl].
 *
 * Generated from protobuf message <code>google.spanner.admin.database.v1.GetDatabaseDdlResponse</code>
 */
class GetDatabaseDdlResponse extends \Google\Protobuf\Internal\Message
{
    /**
     * A list of formatted DDL statements defining the schema of the database
     * specified in the request.
     *
     * Generated from protobuf field <code>repeated string statements = 1;</code>
     */
    private $statements;

    public function __construct() {
        \GPBMetadata\Google\Spanner\Admin\Database\V1\SpannerDatabaseAdmin::initOnce();
        parent::__construct();
    }

    /**
     * A list of formatted DDL statements defining the schema of the database
     * specified in the request.
     *
     * Generated from protobuf field <code>repeated string statements = 1;</code>
     * @return \Google\Protobuf\Internal\RepeatedField
     */
    public function getStatements()
    {
        return $this->statements;
    }

    /**
     * A list of formatted DDL statements defining the schema of the database
     * specified in the request.
     *
     * Generated from protobuf field <code>repeated string statements = 1;</code>
     * @param string[]|\Google\Protobuf\Internal\RepeatedField $var
     * @return $this
     */
    public function setStatements($var)
    {
        $arr = GPBUtil::checkRepeatedField($var, \Google\Protobuf\Internal\GPBType::STRING);
        $this->statements = $arr;

        return $this;
    }

}

